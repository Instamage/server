## InstaMage

Build with express, mongoose, vuejs, bostrap



```java
1. List of User Routes :
```

| Routes            | HTTP  | Headers | Body                                                   | Description              |
| ----------------- | ----- | ------- | ------------------------------------------------------ | ------------------------ |
| /users            | GET   | token   | none                                                   | Find All User            |
| /users/signup     | POST  | none    | username:String<br />password:String<br />email:String | Create new Account       |
| /users/signin     | POST  | none    | email:String<br />password:String                      | Signin into account      |
| /users/send/{:id} | PATCH | token   | none                                                   | Follow or Unfollow Users |
| /users/upload     | PATCH | token   | File                                                   | Update profile image     |
| /users/change     | PATCH | token   | oldPassword: String<br />newPassword: String           | Change old password      |



```java
2. List of Post Routes :
```

| Routes               | HTTP   | Headers | Body                      | Description          |
| -------------------- | ------ | ------- | ------------------------- | -------------------- |
| /posts               | GET    | none    | none                      | Find all Post        |
| /posts               | GET    | token   | none                      | Find User Login Post |
| /posts               | POST   | token   | File<br />caption: String | Create new post      |
| /posts/like/{:id}    | PATCH  | token   | none                      | Like or Unlike post  |
| /posts/comment/{:id} | POST   | token   | comment: String           | Comment text         |
| /posts/{:id}/update  | PATCH  | token   | caption: String           | Update caption       |
| /posts/{:id}/delete  | DELETE | token   | none                      | Delete a post        |



## <span style='color:green'>GET</span> /users

​	Find All User

### Authentication

<span style='color:red'>Token</span>

### Response :

```java
[
  {
    "Following": Array of ObjectId,
    "Followers": Array of ObjectId,
    "_id": ObjectId,
    "username": String,
    "password": String,
    "email": String,
    "profile_img": String,
    "__v": 0
  },
  {...},
  {...}
]
```



## <span style='color:green'>POST</span> /users/signup

​	Create new Account

### Body :

```java
{
  "username": String,
  "password": String,
  "email": String
}
```



### Response :

```java
{
  "username": String,
  "token": String
}
```



## <span style='color:green'>POST</span> /users/signin

​	Logged In

### Body :

```java
{
  "email": String,
  "password": String
}
```



### Response :

```java
{
  "msg": String,
  "token": String
}
```





## <span style='color:green'>PATCH</span> /users/send/{:id}

​	Follow / unfollow

### Authentication

<span style='color:red'>Token</span>



### Response :

```java
{
  "msg": String
}
```



## <span style='color:green'>PATCH</span> /users/upload

​	Update image

### Authentication

<span style='color:red'>Token</span>

### Response :

```java

```

