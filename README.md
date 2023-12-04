# 마음연구소 기업과제

## 서버 실행 방법

1. `.env` 파일 생성

```bash
$ touch .env
```

2. `.env`파일에 아래 내용 붙혀넣기

```bash
# .env
DB_TYPE=postgres
DB_HOST=maumlab-db.cdsp1srklmtj.ap-northeast-2.rds.amazonaws.com
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PW=postgres
DB_SYNC=true
DB_LOG=true
DB_AUTO_LOAD_ENTITIES=true

PORT_NUMBER=4000
```

3. 종속성 설치

```bash
$ npx yarn install
```

4. 서버 실행

```bash
$ npx yarn start:dev
```

5. 서버 정상 접속 확인

```http
http://localhost:4000/graphql
```



---

## ERD 설계

![image-20231205002725896](README.assets/image-20231205002725896.png)



---

## 기능 구현

1. 설문지 (Questionnaire)
   - 생성 : createQuestionnaire
   - 전체 조회 : fetchQuestionnaires
   - 단일 조회 : fetchQuestionnaire
   - 수정 : updateQuestionnaire
   - 논리 삭제 : softDeleteQuestionnaire

2. 문항 (Question)
   - 생성 : createQuestion
   - 전체 조회 : fetchQuestions
   - 단일 조회 : fetchQuestion
   - 수정 : updateQuestion
   - 논리 삭제 : softDeleteQuestion

3. 선택지 (Choice)
   - 생성 : createChoice
   - 전체 조회 : fetchChoices
   - 단일 조회 : fetchChoice
   - 수정 : updateChoice
   - 논리 삭제 : softDeleteChoice

4. 답변 (Answer)
   - 생성 - 설문지 완료 : createAnswer

   ```json
   mutation {
     createAnswer(createAnswerInput: {
       questionnaire: {
         id: 2
         title: "휴가 때 가고 싶은 해외여행"
       }
       questions: [
         {
           id: 1
           questionNumber: 1
     			content: "당신은 다가올 휴가 때 해외 여행을 희망하시나요?"
         },
         {
           id: 2
           questionNumber: 2
     			content: "당신이 희망하는 해외여행의 종류는?"
         },
         {
           id: 3
           questionNumber: 3
     			content: "당신이 희망하는 여행지는?"
         },
         {
           id: 4
           questionNumber: 5
     			content: "당신이 생각하는 여행의 1인당 금액은? (쇼핑비용 제외)"
         },
         {
           id: 5
           questionNumber: 6
     			content: "당신이 해외 여행지를 선택할 때 고려하는 사항은? (중복응답가능)"
         },
         {
           id: 6
           questionNumber: 7
     			content: "당신은 국내여행 보다 해외여행을 선호하시나요?"
         },
         {
           id: 7
           questionNumber: 8
     			content: "당신의 성별은?"
         },
       ]
       choices: [
         {	
           id: 2
           content: "예"
           choiceNumber: 1
           score: 0
         },
         {	
           id: 4
           content: "패키지 여행"
           choiceNumber: 1
           score: 0
         },
         {	
           id: 7
           content: "동남아/대만/서남아"
           choiceNumber: 1
           score: 0
         },
         {	
           id: 13
           content: "100만원 미만"
           choiceNumber: 1
           score: 0
         },
         {	
           id: 18
           content: "기간"
           choiceNumber: 1
           score: 0
         },
         {	
           id: 19
           content: "비용"
           choiceNumber: 2
           score: 1
         },
         {	
           id: 24
           content: "매우 좋음"
           choiceNumber: 1
           score: 0
         },
         {
           id: 30
           content: "여"
           choiceNumber: 2
           score: 1
         },
       ]
     }) {
       id
     }
   }
   ```

   - 전체 조회 : fetchAnswers
   - 단일 조회 - 완료된 설문지 확인 : fetchAnswer

   ```json
   query {
     fetchAnswer(answerId: 2) {
       id
       questionnaire {
         id
         title
       }
       questions {
         id
         questionNumber
         content
       }
       choices {
         id
         choiceNumber
         content
         score
       }
     }
   }
   ```

   - 수정 : updateAnswer
   - 논리 삭제 : softDeleteAnswer
   - 답변 총점 조회 : getAnswerTotalScore

   ```json
   query {
     getAnswerTotalScore(answerId: 2) 
   }
   ```

## 설치 패키지

1. `@nestjs/config`
2. `@nestjs/graphql @nestjs/apollo @apollo/server graphql`
3. `typeorm @nestjs/typeorm pg`
