# Vue-blog

Vue.js 공부한 것을 바탕으로 blog app을 구현해보았습니다. 
PC에 최적화 되어 있습니다.

💻  <https://bomin-vue-blog.netlify.app/>


 ## 🛠 Skill & Tool
 **`HTML5`**  **`CSS3`**  **`Javascript`**  **`Vue.js`**  **`firebase`** **`cloudinary`** **`fontawesome`**
 
## 💡 기능
### Firebase Authentication을 이용한 회원가입 및 로그인, 인증 유지 🔒
 - email, password로 회원가입 후 로그인이 가능하고 파이어베이스에서 보내주는 에러 코드를 활용하여 유효성 검사 수행
 - 구글과 페이스북 계정을 통한 로그인
 - 페이지 새로고침 시 로그인 되어 있는 경우 로그인 유지
    
 ![vue-blog-signup](https://user-images.githubusercontent.com/57257023/127279124-510db84c-f406-4be5-917d-50fe29147e37.gif)

 
### Firebase Realtime Database를 이용한 계정별 데이터 동기화 🔗
 ![vue-blog-sync](https://user-images.githubusercontent.com/57257023/127278000-b86500d2-e2b6-4118-8a0c-f9674c9df976.gif)

### 리스트 아이템 Create, Read, Update, Delete 구현 📜
 - 상태 관리를 위한 Vuex 사용
 - 링크 이동을 위한 vue-router 사용
 - cloudinary를 이용한 이미지 업로드 구현
 - 리스트 아이템 텍스트 작성 시 # 키워드를 필터링 하여 태그 리스트 생성(삭제)
 - 태그 선택 시 해당 태그가 포함된 리스트만 /hashtag/{tagname} 라우터로 이동 후 re-rendering
     
![vue-blog-crud](https://user-images.githubusercontent.com/57257023/127282299-40356b68-d0c8-43ac-9fe9-fd9e77cb4ea8.gif)

 
## 📖 프로젝트를 하며 공부한 것
 - **computed 속성의 함수명과 watch 속성의 함수명이 동일하면 computed에서 데이터가 변경될 경우 watch에서 응답한다.**
 
    ```
    computed: {
      getData() {
        return this.$store.getters.getReadData;
      },
    },
    watch: {
      getData(setItem) {
        console.log(setItem); // true 
        if (setItem) { 
          const postItem = this.$store.state.postItem;
          this.title = postItem.title;
          this.contents = postItem.contents;
        }
      },
    },
    ```
    ❓ 적용 계기    
    파이어베이스에 있는 데이터를 스토어에 저장해서 불러 오는 것보다 화면 렌더링이  먼저 발생해서 빈 화면이 보임
    
 - **router로 params를 이용한 값을 전달할 때는 name을 지정해주어야 한다.**    
   ```
   {
      path: '/post/:id',
      name: 'PostReadPage',
      component: () => import('@/views/PostReadPage.vue'),
    },
   ```
        
     ❓ 적용 계기    
     name 지정을 하지 않았을 때 params를 넘겨도 들어오지 않았음
 - **같은 컴포넌트의 router-view에 다른 결과를 렌더링 시키려면 ` key `속성을 바인딩 한다.**    
   라우터 뷰가 동일한 컴포넌트를 보여주고 있기 때문에 key를 통해 경로 개체 속성을 강제로 연결시켜줌으로써, 보여지는 화면에 전체 URL을 연결하여 탐색하는 이벤트가 발생할 때마다 페이지를 리로드 시킨다.   
   
   ```
   <router-view :key="$route.fullPath"></router-view>
   ```
   ❓ 적용 계기    
   메인 페이지에서 전체 리스트를 보여주고 태그를 클릭하면 tagname을 params로 넣어 보내준 후, 
   태그가 포함된 리스트만 걸러서 리로드 시키려 했으나 링크는 ` /hashtag/{tagname} ` 과 같이 바뀌었지만 계속 전체 리스트만 보여줌 
   
 - **$refs 속성을 이용해 DOM에 접근할 수 있다.**    
  템플릿 안의 element에 ref 속성을 추가함으로써, 뷰 인스턴스에 이 element에 대한 정보를 줄 수 있고 접근할 수 있다. 하지만 되도록 DOM에 접근하지 않도록 하는 게 좋아서 ref 사용은 지양 하는 편이다.
    ```
    <input ref="imageFileInput" type="file" />
    ```
    ❓ 적용 계기    
    파일 업로드를 위해 input 태그를 사용하였는데 ui이 변경이 어려워 숨김 처리하고, ref를 사용하여 button 태그를 만들어 input에 접근 시킴
    
