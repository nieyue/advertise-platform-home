/**
 * 工具类
 */
export default {
  /*
  *获取时间
  */
   getTime(time) {
    let timec = new Date(Number(time))
    const year = timec.getFullYear()
    const month = timec.getMonth() + 1
    const day = timec.getDate()
    const hours = timec.getHours()
    const minutes = timec.getMinutes()
    const seconds = timec.getSeconds()
    let timer = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    return timer
  },
/*
  *递归 把array数组递归成属性挂载在$this对象上
  *p.str='b.c.d.ee.cc.22' 字符串
  *p.resource  该对象需要接受的值
  *$this 输入对象
  * 结果：$this.b.c.d.ee.cc.22=p.resource
  */
  recursion($this,p){
    let array=p.str.split('.');
      function temp(obj){
         let oldArrayElement=array[0];
        if(array.length!=1){
          obj[oldArrayElement]=obj[oldArrayElement]||{};
          array.shift()
          temp(obj[oldArrayElement]); //递归遍历
         }else{
           obj[oldArrayElement]=p.resource;
         }
       }
       temp($this);//初始化
   },
  /**
   * 获取七牛云  token
   *p.url 获取token url 
   *p.qiniuToken 变量qiniuToken
   *p.success 回调
   */
  getQiniuToken($this,p) {
    $this.axiosbusiness.get($this,{
      url:p.url,
      data:p.qiniuToken,
      success:()=>{ 
        if(typeof p.success=='function'){
        p.success();
        }
      }
    })
  },
  /**
   * 七牛云js-sdk 上传
   *p.url 获取token url  (可选，自定义)
   *p.qiniuToken 变量qiniuToken
   *p.browseButton 上传按钮
   *p.container  box包裹层(可选)
   *p.dropElement 删除按钮
   *p.maxFileSize 最大上传文件限制 (可选，默认100mb)
   *p.chunkSize 分块大小 (可选，默认4mb)
   *p.multiSelection 是否允许同时选择多文件 (可选，默认false)
   *p.fileTypes 上传文件类型 (可选，默认'jpg,jpeg,gif,png')
   *p.filesAdded 上传文件类型 (可选，默认'jpg,jpeg,gif,png'
   *
   *p.filesAdded(up,files) 文件添加进队列后，处理相关的事情 (可选)
   *p.beforeUpload(up, file) 每个文件上传前，处理相关的事情 (可选)
   *p.uploadProgress(up, file) 每个文件上传时，处理相关的事情 (可选)
   *p.uploadComplete() 队列文件处理完毕后，处理相关的事情 (可选)
   *p.fileUploaded(up, file, info) 每个文件上传成功后，处理相关的事情 
   *p.error(up, err, errTip) 上传出错时，处理相关的事情 (可选)
   *p.success 回调
   */
  getQiniuUploader($this,p) {
    // /* eslint-disable no-undef */
    var uploader = Qiniu.uploader({
      runtimes: 'html5,flash,html4',
      browse_button: p.browseButton, // 上传按钮的ID
      /* eslint-disable no-undef */
      container:p.container|| (p.browseButton + 'Box'), // 上传按钮的上级元素ID
      drop_element: p.dropElement,
      max_file_size: p.maxFileSize||'500mb', // 最大文件限制
      dragdrop: true,
      chunk_size: p.chunkSize||'4mb', // 分块大小
      // Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
      uptoken: p.qiniuToken,
      //  默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
      //  save_key: true,
      //  默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
      domain: p.url||'http://p55v5f6od.bkt.clouddn.com', // 自己的七牛云存储空间域名
      multi_selection: false, // 是否允许同时选择多文件
      // 文件类型过滤，这里限制为图片类型
      filters: {
        mime_types: [
          {title: 'Image files', extensions: p.fileTypes||'jpg,jpeg,gif,png,flv,mp4,wmv,avi,rm,rmvb,swf'}
        ]
      },
      auto_start: true,
      unique_names: true,
      init: {
        'FilesAdded': function (up, files) {
          if(typeof p.filesAdded=='function'){
            p.filesAdded(up,files);
          }
        },
        'BeforeUpload': function (up, file) {
          if(typeof p.beforeUpload=='function'){
            p.beforeUpload(up, file);
          }
          $this.$Spin.show();
        },
        'UploadProgress': function (up, file) {
          // 可以在这里控制上传进度的显示
          // 可参考七牛的例子
          if(typeof p.uploadProgress=='function'){
            p.uploadProgress(up, file);
          }
        },
        'UploadComplete': function () {
          
          if(typeof p.uploadComplete=='function'){
            p.uploadComplete();
          }
        },
        'FileUploaded': function (up, file, info) {
          $this.$Spin.hide();
          // 每个文件上传成功后,处理相关的事情
          if(typeof p.fileUploaded=='function'){
            p.fileUploaded(up, file, info);
          } 
        },
        'Error': function (up, err, errTip) {
          $this.$Message.error(errTip)
          $this.$Spin.hide();
          if(typeof p.error=='function'){
            p.error(up, err, errTip);
            } 
        },
        'Key': function (up, file) {
          // 当save_key和unique_names设为false时，该方法将被调用
          return ''
        }
      }
    })
    uploader.start()
  },
   /**
   *文件上传简易版  token
   *p.url 后台请求qiniuToken链接地址（可选） 
   *p.qiniuToken qiniuToken名称 （可选）
   *p.browseButton 点击按钮 
   *p.container  box包裹层(可选)
   *p.dropElement 拖拽框
   *p.resource 返回接收地址变量 (可选,一般在 编辑器里面用不需要)
   *p.success 回调
   *p.fileUploaded(up, file, info) 每个文件上传成功后，处理相关的事情 
   */
  getQiniuSimpleUploader($this,p) {
      this.getQiniuToken($this,{
       url:p.url||'/tool/qiniuToken',
       qiniuToken:p.qiniuToken||'qiniuToken',
       success:()=>{
      this.getQiniuUploader($this,{
        qiniuToken:$this[p.qiniuToken]||$this.qiniuToken,
        browseButton:p.browseButton,
        container:p.container||null,
        dropElement:p.dropElement,
        fileUploaded:(up, file, info)=>{
            let domain = up.getOption('domain')
            let res = JSON.parse(info.response)
            let url=domain +"/"+  res.key;
            if(p.resource){
              // if(p.resource.indexOf(".")>-1){
              //   let nr=p.resource.split('.')//分割
              //   $this[p.resource.substr(0,p.resource.indexOf("."))][p.resource.substr(p.resource.indexOf(".")+1)]=url;
              // }else{
              //   $this[p.resource] = url
              // }
              //递归调用
              this.recursion($this,{
                str:p.resource,
                resource:url
              });
            }
            if(typeof p.success=='function'){
              p.success(url);
            } 
            if(typeof p.fileUploaded=='function'){
              p.fileUploaded(up, file, info);
            } 
            }
           //let temp= this.recursion($this,nr)
              
      })
       }
     });
  }
  
}