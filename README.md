## 多人線上聊天軟體

- 可以同時多人上線聊天
- 進入網頁後，只需輸入暱稱即可開始使用
- 能夠保存所有對話紀錄

#### 環境建置與需求

- 使用框架 express
- 使用資料庫 MySQL
- 安裝
  - 下載專案
    ```
    https://github.com/HUANG-SIH-MAN/chatroom-project.git
    ```
  - 安裝專案
    ```
    $ cd chatroom-project
    $ npm install
    ```
  - 資料庫建置
    ```
    $ npx sequelize db:migrate:all
    ```
  - 執行後台伺服器
    ```
    $ npm run start
    $ npm run dev
    ```
  - 伺服器位置
    ```
    localhost:3000
    ```
- 開啟前台網頁
  - 使用 Visual Studio Code
  - 點選下方 Go Live
