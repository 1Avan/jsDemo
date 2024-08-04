//引入模块
import { load } from "/admin/utils/LoadView.js"
load("sidemenu-addNews")


const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
  placeholder: 'Type here...',
  MENU_CONF:{},
  onChange(editor) {
    const html = editor.getHtml()
    // console.log('editor content', html)
    // 也可以同步到 <textarea>

  }
}

editorConfig.MENU_CONF['uploadImage'] = {
  server: 'http://localhost:3000/upload', // 上传图片地址
  // server: 'http://106.12.198.214:3000/api/upload-img-10s', // 用于测试 timeout
  // server: 'http://106.12.198.214:3000/api/upload-img-failed', // 用于测试 failed
  // server: 'http://106.12.198.214:3000/api/xxx', // 用于测试 404

  timeout: 5 * 1000, // 5s
  fieldName: 'custom-fileName',
  metaWithUrl: true, // 参数拼接到 url 上
  headers: { Accept: 'text/x-json' },
  maxFileSize: 10 * 1024 * 1024, // 10M
  base64LimitSize: 10 * 1024 * 1024, // 10M以下插入 base64

  onBeforeUpload(files) {
    console.log('onBeforeUpload', files)

    return files // 返回哪些文件可以上传
    // return false 会阻止上传
  },
  onProgress(progress) {
    console.log('onProgress', progress)
  },
  onSuccess(file, res) {
    console.log('onSuccess', file, res)
  },
  onFailed(file, res) {
    alert(res.message)
    console.log('onFailed', file, res)
  },
  onError(file, err, res) {
    alert(err.message)
    console.error('onError', file, err, res)
  },

  // // 用户自定义插入图片
  // customInsert(res, insertFn) {
  //   console.log('customInsert', res)
  //   const imgInfo = res.data[0] || {}
  //   const { url, alt, href } = imgInfo
  //   if (!url) throw new Error(`Image url is empty`)

  //   // 自己插入图片
  //   console.log('自己插入图片', url)
  //   insertFn(url, alt, href)
  // },

  // // 用户自定义上传图片
  // customUpload(file, insertFn) {
  //   console.log('customUpload', file)

  //   return new Promise((resolve) => {
  //     // 插入一张图片，模拟异步
  //     setTimeout(() => {
  //       const src = `https://www.baidu.com/img/flexible/logo/pc/result@2.png?r=${Math.random()}`
  //       insertFn(src, '百度 logo', src)
  //       resolve('ok')
  //     }, 500)
  //   })
  // },

  // // 自定义选择图片（如图床）
  // customBrowseAndUpload(insertFn) {
  //   alert('自定义选择图片，如弹出图床')

  //   // 插入一张图片，模拟异步
  //   setTimeout(() => {
  //     const src = 'https://www.baidu.com/img/flexible/logo/pc/result@2.png'
  //     insertFn(src, '百度 logo', src) // 插入图片
  //   }, 500)
  // },
}



const editor = createEditor({
  selector: '#editor-container',
  html: '<p><br></p>',
  config: editorConfig,
  mode: 'default', // or 'simple'
})

const toolbarConfig = {}

const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: toolbarConfig,
  mode: 'default', // or 'simple'
})
let form = document.querySelector("#addNewsForm")
form.onsubmit = async function (e) {
  e.preventDefault()
  let photoAsBase64 = await new Promise(
    (resolve, reject) => {
      let fr = new FileReader();
      fr.readAsDataURL(photo.files[0])
      fr.onload = function () {
        resolve(fr.result);
      }; fr.onerror = function () {
        reject("图片上传失败");
      };
    }
  )

  let res = await fetch(
    `http://localhost:3000/news`,
    {
      method: 'POST',
      body: JSON.stringify({
        title: title.value,
        content: editor.getHtml(),
        photo: photoAsBase64,
        type: type.value,
        //作者
        author:JSON.parse(localStorage.getItem("token")).username
      }),
     headers: {
      'Content-type': 'application/json'
     }
    }
  )
  if(res.ok){
    window.location.href = "/admin/views/news-manage/NewsList/index.html"
  }
}