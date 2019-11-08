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
| /posts/all           | GET    | none    | none                      | Find all Post        |
| /posts               | GET    | token   | none                      | Find User Login Post |
| /posts               | POST   | token   | File<br />caption: String | Create new post      |
| /posts/like/{:id}    | PATCH  | token   | none                      | Like or Unlike post  |
| /posts/comment/{:id} | POST   | token   | comment: String           | Comment text         |
| /posts/{:id}/update  | PATCH  | token   | caption: String           | Update caption       |
| /posts/{:id}/delete  | DELETE | token   | none                      | Delete a post        |



## Error Response :

```java
[
  {
    "status": 400,
    "msg": [
      'wrong old password',
      'email/pasword wrong',
      'email is required',
      'username is required',
      'password is required',
      'password min 8 char'
    ]
	},
  {
    "status": 401,
    "msg": [
      'You are not Authorized!',
      'Authentication Error',
      'Invalid Token'
    ]
  },
  {
    "status": 500,
    "msg": 'Internal Server Error'
  }
]
```



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

### Body :

```java
{
	"image": File
}
```



### Response :

```java
{
  "Following": Array of ObjectId,
  "Followers": Array of ObjectId,
  "_id": ObjectId,
  "username": String,
  "password": String,
  "email": String,
  "profile_img": String,
  "__v": 0
  }
```



## <span style='color:green'>PATCH</span> /users/change

​	Update image

### Authentication

<span style='color:red'>Token</span>

### Body :

```java
{
  "oldPassword": String,
  "newPassword": String
}
```



### Response :

```java
{
  "Following": Array of ObjectId,
  "Followers": Array of ObjectId,
  "_id": ObjectId,
  "username": String,
  "password": String,
  "email": String,
  "profile_img": String,
  "__v": 0
  }
```



### <span style='color:green'>GET</span> /posts/all

​	Find All Post



### Response :

```java
[
  {
    "Likes": Array of ObjectId,
    "comments": Array,
    "_id": ObjectId,
    "userId": {
        "Following": Array of ObjectId,
        "Followers": Array of ObjectId,
        "_id": ObjectId,
        "username": String,
        "password": String,
        "profile_img": String,
        "__v": 0
      },
    "caption": String,
    "image_url": String,
    "createdAt": Date,
    "updatedAt": Date,
    "__v": 0
  },
  {...},
  {...}
]
```



## <span style='color:green'>GET</span> /posts

​	Get Login Post

### Authentication

<span style='color:red'>Token</span>

### Response :

```java
{
    "Likes": Array of ObjectId,
    "comments": Array,
    "_id": ObjectId,
    "userId": {
        "Following": Array of ObjectId,
        "Followers": Array of ObjectId,
        "_id": ObjectId,
        "username": String,
        "password": String,
        "profile_img": String,
        "__v": 0
    	},
    "caption": String,
    "image_url": String,
    "createdAt": Date,
    "updatedAt": Date,
    "__v": 0
  }
```





## <span style='color:green'>POST</span> /posts

​	Create new Post 		

### Authentication

<span style='color:red'>Token</span>

### Body :

```java
{
  "image": File,
  "caption": String
}
```



### Response :

```java
{
    "Likes": Array of ObjectId,
    "comments": Array,
    "_id": ObjectId,
    "userId": ObjectId,
    "caption": String,
    "image_url": String,
    "createdAt": Date,
    "updatedAt": Date,
    "__v": 0
  }
```



## <span style='color:green'>PATCH</span> /posts/like/{:id}

​	Like / Unlike Post

### Authentication

<span style='color:red'>Token</span>

### Response :

```java
{
  "msg": String
}
```



## <span style='color:green'>POST</span> /posts/comment/{:id}

​	Comment post

### Authentication

<span style='color:red'>Token</span>

### Body: 

```java
{
  "comment": String
}
```



### Response :

```java
{
  "Likes": Array of ObjectId,
  "comments": Array,
  "_id": ObjectId,
  "userId": String,
  "caption": String,
  "image_url": String,
  "createdAt": Date,
  "updatedAt": Date,
  "__v": 0
}
```



## <span style='color:green'>PATCH</span> /posts/{:id}/update

​	Update comment post

### Authentication

<span style='color:red'>Token</span>

### Response :

```java
{
  "msg": String
}
```



## <span style='color:green'>DELETE</span> /posts/{:id}/delete

​	Delete post

### Authentication

<span style='color:red'>Token</span>

### Response :

```java
{
  "msg": String
}
```

