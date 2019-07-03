# Diary Calender

## 一句話描述這個專題
一個行事曆以及手帳日記兼具的可愛網頁  
Deploy Page : https://diary-calendar-app.herokuapp.com/ <br>
Demo Video : https://youtu.be/NUjAfht8ofQ


## Usage

### Setup
Run the following command to setup the project:  

```
$ clone git https://github.com/chiajoukuo/Diary_Calendar.git
$ cd Diary_Calendar
$ npm install   
$ npm run client-install
```  

### Run the project
```
$ npm run dev
```

這個專案的前端使用`localhost:3000`，後端使用`localhost:5000`。


## 系統說明與特色
我們做了一個可在行事曆內自由增加日記的系統。
我們可以進到行事曆頁面增加事件(可更改時間,名稱和標註顏色)。
也可以點選日期以進入該日的日記，可加入文字和圖片。
加入的文字和圖片可以拖曳放大縮小旋轉，自由放在版面上的任何地方。

### 行事曆
我們的行事曆有以下功能
1. 新增/更新事件
    我們可在行事曆上拉取時間，將事件名稱填入表單，並選取標註的顏色。
    可再度點選事件以進行更新。勾選左上角的欄位可同時編輯相同的事件。
2. 連結至日記頁面
    點選第一列的日期就可以進入到該日的日記裡頭。

### 日記
我們的日記有以下功能
1. 新增/更新文字/圖片和貼圖
    可新增文字,圖片和貼圖，也可以**雙擊**該物件以更新它的資料
    圖片可使用URL或選擇檔案上傳
2. 拖曳，放大，縮小，旋轉
    可自由拖曳物件，而用滑鼠滾輪滾動可將物件放大縮小(此為預設值)，而點選左側的旋轉按鈕可將之設置成選轉模式，此時滾動滑鼠則可將該物件旋轉
    
### 登入系統
我們的日記需要先行登入才能使用。因此具有登入帳號以及創建帳戶的功能。進到每一個頁面也會先驗證身分才會生成日記和行事曆頁面。
```
// 提供給助教使用
Name: webfinal
Password: 12345
```

## 使用與參考之框架/模組/原始碼

### 前端
- React: 我們的前端是以React開發
- React-week-calender: 行事曆的套件，省去手刻行事曆的麻煩
- Material ui, Reactstrap: 加速前端開發速度
- Moment: 行事曆的時間format 
- redux: 統一管理state
- axios: 建立http request

### 後端
- express: 建立server
- bcrypt: 用來計算使用者密碼的雜湊值
- jsonwebtoken: 得到使用者的token來認證身份
- mongoose: 連接MongoDB資料庫
- nodemon: 方便後端開發


## 分工
- b05901166郭加柔：UI, Diary功能, 圖片縮放旋轉
- b05901006高珮瑋：前後端的連接, 登入功能, Diary Gallery, 頁面Router指向, 圖片上傳功能
- b05901159邱昱禎：UI, bug fixed, Calendar功能, 事件更新儲存

## 心得
- b05901159邱昱禎：這次實做了行事曆，由於行事曆是開源元件，所以有深入看懂並了解它的程式碼，也對於props傳遞的結構更加的熟悉。在製做UI的時候也發現了不少好用的套件，以後都可以拿出來使用。這學期最大的收穫就是知道網頁的領域非常的龐大，不論前後端都有好幾種框架，模組。希望自己以後能夠繼續鑽研。
- b05901006高珮瑋：這次Final負責架前後端的連接，以及登入功能的實現，雖然架構是參考期中project，用redux來統一所有的state以便react component能夠直接拿取與實行action，不過算是真的有比較了解其中是怎麼運作，透過dispatch發出action的request來與後端溝通，再透過reducer更新store裡面的state，比期中增加了許多功能，所以覺得其實學到蠻多的，之後應該也能好好的運用。
- b05901166郭加柔：這次的final我主要做前端很多日記頁面的元素的處理，那些移動編輯等等的功能感覺很常見，但其實css超級難處理的！！！常常一個bug就要修很久，而且css在不同功能、元素之間也會互相影響，修正好一個功能前面又壞掉也常常發生。不過能自己寫網頁真的蠻好玩的，這幾天很像真的是個軟體工程師，一直抓bug跟列出所有功能測試。最後非常感謝我的組員們願意跟我一起做這個電子手帳日記，還一起寫到睡覺都在想他睡不著，不過有很多一開始想要的很厲害的功能還來不及做，希望以後能有人把它做出來XDD

### 參考資料
* [物件移動](https://medium.com/@crazypixel/mastering-drag-drop-with-reactjs-part-01-39bed3d40a03)
* [MERN架構](https://www.youtube.com/watch?v=PBTYxXADG_k&t=2s)
* [react-weekly-calendar](https://github.com/birik/react-week-calendar)
* UI : [reactstrap](https://reactstrap.github.io/)、[Material-UI](https://material-ui.com/)、[bootstrap](https://getbootstrap.com/)

### 未來展望
* 可伸縮事件時間的行事曆：[react-available-times](https://github.com/trotzig/react-available-times)
* 可與其他人共用行事曆的事件與分享日記
* 改善視窗縮小Modal沒有flex的問題

