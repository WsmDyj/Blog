const fs = require("fs");
const path = require("path");
const Minio = require("minio");
const co = require("co");
const globby = require("globby");
const slash = require("slash");
require("colors");

class WebpackGiftOssPlugin {
  constructor(options) {
    this.config = Object.assign(
      {
        test: false,
        verbose: true,
        projectName: "",
        buildRoot: ".",
        setOssPath: null,
        setHeaders: null,
      },
      options
    );
    
    this.configErrStr = this.checkOptions(options);
  }
  
  apply(compiler) {
    if (compiler) {
      this.doWithWebpack(compiler);
    } else {
      return this.doWidthoutWebpack();
    }
  }
  
  doWithWebpack(compiler) {
    compiler.hooks.afterEmit.tapPromise(
      "WebpackGiftOss",
      async (compilation) => {
        if (this.configErrStr) {
          compilation.errors.push(new Error(this.configErrStr));
          return Promise.resolve();
        }
        
        const outputPath = path.resolve(slash(compiler.options.output.path));
        
        const { from = outputPath + "/" + "**", verbose } = this.config;
        
        const files = await globby(from);
        
        if (files.length) return this.upload(files, true, outputPath);
        else {
          verbose && console.log("no files to be uploaded");
          return Promise.resolve();
        }
      }
    );
  }
  
  async doWidthoutWebpack() {
    if (this.configErrStr) return Promise.reject(new Error(this.configErrStr));
    
    const { from, verbose } = this.config;
    const files = await globby(from);
    
    if (files.length) return await this.upload(files);
    else {
      verbose && console.log("no files to be uploaded");
      return Promise.resolve("no files to be uploaded");
    }
  }
  
  upload(files, inWebpack, outputPath = "") {
    const {
      projectName,
      buildRoot,
      setHeaders,
      setOssPath,
      verbose,
      test,
      
      host,
      accessKey,
      secretKey,
      bucketName,
    } = this.config;
    
    const client = new Minio.Client({
      endPoint: host,
      accessKey: accessKey,
      secretKey: secretKey,
    });
    
    files = files.map((file) => path.resolve(file));
    
    return new Promise((resolve, reject) => {
      const o = this;
      const splitToken = inWebpack
        ? "/" + outputPath.split("/").slice(-2).join("/") + "/"
        : "/" + path.resolve(buildRoot).split("/").slice(-2).join("/") + "/";
      
      let cloneFiles = files.slice.call(files);
      co(function* () {
        let filePath,
          i = 0,
          len = files.length;
        while (i++ < len) {
          filePath = files.shift();
          
          let ossFilePath = slash(
            path.join(
              projectName,
              (setOssPath && setOssPath(filePath)) ||
              (splitToken && filePath.split(splitToken)[1]) ||
              ""
            )
          );
          
          if (test) {
            console.log(
              filePath.blue,
              "is ready to upload to " + ossFilePath.green
            );
            continue;
          }
          
          // 由于fPutObject这个api返回的result为文件etag，无法用作上传成功url展示，只能自己拼接
          yield client.fPutObject(
            bucketName,
            ossFilePath,
            filePath,
            (setHeaders && setHeaders(filePath)) || {}
          );
          
          const cdnUrl = host + "/" + bucketName + "/" + ossFilePath;
          
          verbose &&
          console.log(
            filePath.blue,
            "\nupload to " + ossFilePath + " success,".green,
            "cdn url =>",
            cdnUrl.green
          );
        }
      }).then(
        () => {
          resolve(cloneFiles);
        },
        (err) => {
          console.log(`上传gift失败: ${err}`.red);
          reject();
        }
      );
    });
  }
  
  checkOptions(options = {}) {
    const {
      from,
      host,
      bucketName,
      projectName,
      accessKey,
      secretKey,
    } = options;
    
    let errStr = "";
    
    if (!host) errStr += "\n没有指定gift集群host";
    if (!bucketName) errStr += "\n没有指定bucket";
    if (!projectName) errStr += "\n没有指定项目名称";
    if (!accessKey) errStr += "\n没有指定accessKey";
    if (!secretKey) errStr += "\n没有指定secretKey";
    
    if (Array.isArray(from)) {
      if (from.some((g) => typeof g !== "string"))
        errStr += "\nfrom参数里面每个item需要是glob字符串";
    } else {
      let fromType = typeof from;
      if (["undefined", "string"].indexOf(fromType) === -1)
        errStr += "\nfrom参数需要是字符串或者数组";
    }
    
    return errStr;
  }
}

module.exports = WebpackGiftOssPlugin;
