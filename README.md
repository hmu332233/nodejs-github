## nodejs-github

passport-github과 github api를 이용한  
인증 후 github api 사용 예제

## 주요 npm
- [octonode](https://www.npmjs.com/package/octonode)
  - github api 사용을 도와주는 모듈
  - v3을 사용
- [passport-github](https://www.npmjs.com/package/passport-github)
  - passport github
  - passport-bitbucket


## access token 갱신

- github
```
$ curl -X POST -u "client_id:secret"
  https://api.github.com/applications/:client_id/tokens/:access_token
```

- bitbucket
```
$ curl -X POST -u "client_id:secret"
  https://bitbucket.org/site/oauth2/access_token \
  -d grant_type=refresh_token -d refresh_token={refresh_token}
```