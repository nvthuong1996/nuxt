# nuxt-convention

> My majestic Nuxt.js project

## Cài đặt project


```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Cấu hình vscode
Cần một số cấu hình vscode để linting và catch eslint error hiệu quả

Project đã để một số cấu hình vscode trong folder .vscode

Để project linting hiệu quả cài đặt thêm extension: `vetur` và `eslint`

Khi save file eslint sẽ tự động fix lỗi eslint

Extension recommend: `Auto close Tag`, `Auto import`, `Code spell checker`,` import const`, `html snippet`, `es6 code snippet`,`material icon theme`

## Quy ước đặt tên file
### Chung
Không đặt tên file là `index` làm vậy trong quá trình code sẽ sinh ra nhiều file `index` khó cho việc tìm kiếm sau này. Cứ đặt đúng tên file theo chức năng của nó ví dụ `/customer/customer.vue`. Nếu đặt vậy đường dẫn đến customer page sẽ là `/customer/customer` chứ ko phải `/customer` nhưng như vậy vẫn hơn là một đống `index`

### Page file
Các file nằm trong folder page sẽ sử dụng kebab-case ( dùng `-` để nối tên page có nhiều chữ)


### Component file
Components file sẽ sử dụng kiểu PascalCase.

### Js file ,css
Js,css file sử dụng kiểu kebab-case

## Css
Project sử dụng 2 file là mixin.scss và variable.scss scss trong /assets/scss. 2 file này chứa config scss cho dự án như màu sắc font chữ và các hàm hay dùng.
Nó sẽ inject các biến và các hàm này trên toàn cục và chúng ta có thể sử dụng nó ở trong component: Ví dụ.
```
<style lang='scss'>
.demo{
    color:$brand-color;
}
</style>
```

> Chú ý các file này không phát sinh css khi build. nó chỉ có tác dụng define variable và mixin và inject lên toàn cục bằng cách sử dụng `@nuxtjs/style-resources`. Nên không được thêm class các style vào 2 file này.


## Store
### Quy ước tên:
* state dùng camelCase
* mutation dùng underscore
* action camelCase

### mutation
Mutations ta dùng Constants như recommend vuex. Khi đó tên mutation sẽ được define trong @/constants/mutations
https://vuex.vuejs.org/guide/mutations.html#using-constants-for-mutation-types

### Tổ chức store
Theo mình thì sẽ có 2 kiểu store

1. Store crud object
2. Store quản lý trạng thái toàn cục của app

#### Store crud object

Ví dụ nếu ta có các object customer , staff ... thì mỗi object đó nên có 1 store để thực hiện crud. Xem `store/todo.js`. những store này sẽ đặt trong `/store/customer` không nên chia lớp module `/store/sale/customer`. Càng chia nhiều lớp module thì càng khó nhớ vị trí store và càng khó sử dụng.

#### Store quản lý trạng thái toàn cục của app

Đây là những trạng thái state được chia qua nhiều component nhiều cấp khác nhau. Vấn đề là làm sao phân biệt được state nào là toàn cục sẽ đặt trong store và state nào là cục bộ sẽ đặt trong component. Hãy đọc trong mục component.

## Plugin
Plugin nên chia nhỏ theo chức năng của nó. Ví dụ ta không nên có 1 plugin tên là `global.js` sẽ register những global component lên toàn cục. Một plugin sẽ làm một việc.



## This context

This trong component và this trong store là khác nhau.
Plugin của nuxt có thể inject hàm hoặc biến vào trong this. Xem example `nuxt/axios` https://github.com/nuxt-community/axios-module/blob/0957082a92b551fa3b283fd441ce5e0d4178d7f9/lib/plugin.js#L217

```
ctx.$axios = axios // inject vào this của component
inject('axios', axios) // inject vào this của store
```



## Mixin
Chứa các mixin của project sử dụng để nhúng vào toàn cục thông qua plugin hoặc chỉ sử dụng trong component

## Models
Chứa các class tồn tại trong app.

## Components
Components chia thành 2 loại:
1. Component tái sử dụng được
2. Component không tái sử dụng được

### Component tái sử dụng được:

> Là component có thể dễ dàng dùng lại ở các screen khác nhau thậm chí có thể đóng gói lại. ( Ở đây chúng ta chỉ tiếp cận ở mức độ là có thể dùng lại ở nhiều screen khác nhau)

Phải suy nghĩ kĩ để biết component nào là cần phải sử dụng lại. Khi thiết kế một component có thể sử dụng lại thì cần đảm bảo 1 tính chất quan trọng:

* Phải đảm bảo khi truyền prop vào component thì component phải khôi phục được trạng thái của nó. Ví dụ như là ta có 1 component InputDate nhận vào prop là date. Nếu ta truyền date vào trong thì đảm bảo InputDate phải hiển thị được date ra chứ nó ko phải chỉ dùng để emit date ra ngoài.


InputDate là 1 component đơn giản trong thực tế có nhiều component phức tạp hơn nhiều.Để đảm được tính chất trên thì:
 * State của component không được đưa vào store. 
 * Có thể sử dụng gọi đến các store khác nhưng phải đảm bảo store đó không ảnh hưởng gì đến trạng thái của component. 

### Component không tái sử dụng được:
> Đây là component được tổng hợp lên từ những component tái sử dụng được.

Như nói trong phần Store thì state của loại component này chính là loại state có thể đưa vào store được.


## Các lib sử dụng trong project
* `@nuxtjs/auth` https://github.com/nuxt-community/dotenv-module
* `@nuxtjs/axios` https://axios.nuxtjs.org/usage
* `@nuxtjs/dotenv` và `nuxt-env`

> `@nuxtjs/dotenv` load env from .env in project and can access it by context or process.env
`nuxt-env` injects your environment variables into your Nuxt app using this.$env.

## Vue convention

>doc: https://vuejs.org/v2/style-guide/

### Tên prop component và event

Tên prop và component nên được khai báo với kiểu camelCase nhưng được truyền vào được dạng kebab-case
```
prop:{
    isShow:Boolean
}

<component :is-show="true"></component>
```

```
<template>
  <el-input></el-input>
</template>

<script>
export default {
  components:{
    ElInput
  }
}
</script>
```

Tên event dùng kiểu kebab-case
```
this.emit('user-click')

```

### Sủ dụng dynamic component để tránh v-if v-else nhiều

> doc: https://vuejs.org/v2/guide/components-dynamic-async.html

....

## Hiểu về hệ thông Reactivity
> doc:https://vuejs.org/v2/guide/reactivity.html

> Để làm việc với object và hiểu được ví dụ hãy đảm bảo bạn hiểu được khái niệm `tham chiếu` của object trong javascript.

Tóm lại thì 1 cái data trong vue phải được khai báo đầy đủ thuộc tính trước để thuộc tính đó thể Reactivity ( vue tự render lại khi thuộc tính đó thay đổi ). nếu không thì phải dùng this.$set https://vuejs.org/v2/api/#vm-set-target-propertyName-index-value

> Với dạng mảng vuejs có thể theo dõi được các phương thức push() pop() shift() unshift() splice() sort() reverse() . Những cái này được mô tả trong tài liệu của vuejs https://vuejs.org/v2/guide/list.html

Giả sử ta đã có 1 state của vue là listTodo. trong trường hợp dưới đây hãy đoán xem thuộc tính date có được Reactivity không ?
```
todo = {
    name:'test'
}
todo.date = new Date()  // date được khai báo sau khi todo được khởi tạo

listTodo.push(todo)

```

> Câu trả lời là có: vì vue chỉ bắt đầu setup để `todo` có thể Reactivity tại thời điểm `todo` được push vào `listTodo`. Mà tại thời điểm đó thì `date` đã tồn tại rồi.

Thử lại với trường hợp này và kiểm tra xem `date` có được reactive không?
```
todo = {
    name:'test'
}

listTodo.push(todo)

todo.date = new Date()  // date được khai báo sau khi push vào todo
```

## Hiểu về key prop
> Nếu key của một component thay đổi thì vue sẽ render lại component đó. Vì vậy key hữu ích khi bạn muốn 1 component nào đó phải render lại khi 1 `state` nào đó thay đổi. Nhưng mà nếu bạn đang thắc mắc là state thay đổi component tự render lại thì hãy chú ý cái `state` mình nói ở trên có thể là 1 cái state ko liên quan đến component đó $route chả hạn. 

Khi dùng v-for thì vue bắt phải dùng key. Câu hỏi đặt ra là tại sao lại vậy.

Trả lời: Bởi vì vue cần theo dõi sự thay đổi của những component trong list để render lại những cái thay đổi vì vậy nó cần định danh của component đó trong list. 
Giả sử bạn có 10 viên vi đồng màu xếp thành 1 hàng. bạn ngoẳng mặt đi và để 1 ai đó đổi đổi bi thì lúc ngoẳng lại làm sao bạn biết được các viên bi kia đã thay đổi như thế nào. Còn nếu đánh số từng viên bi một thì chỉ cần so trạng thái trước và sau là được.

> Xem ví dụ về transition ở đây bạn sẽ hiểu với việc đặt giúp key vue biết chính xác vị trí component được thay đổi như thế nào, thằng nào đổi chỗ cho thằng nào, thằng nào thêm vào, thằng nào xoá đi để tạo hiệu ứng cho transition https://vuejs.org/v2/guide/transitions.html#List-Move-Transitions

Câu hỏi đặt ra nữa là: Nên đặt key theo index hay theo id object.

Trả lời: Hiểu được bản chất của key trong v-for ta dễ dàng suy luận với list cố định không thay đổi ( không thêm sửa xoá đảo vị trí) ta có thể dùng index. Ngược lại ta dùng id object trong mảng để làm key. 















































