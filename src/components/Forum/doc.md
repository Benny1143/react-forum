### Onboarding > /forum /onboarding

Location: src\components\Forum\Onboarding\Onboarding.js

API-OUT

```json
{
  "subjects": array[string],
  "levelsInterests": array[string]
}
```

## Forum

Components

- LeftSideBar

### LeftSideBar

Request User's "Subjects & Interest"

API-IN `array[String]`: according to TopicList.js (names only)

### RightSideBar

Request setting up data and top tutors

API-IN `array[number]`: for setting up, "Visit your feed" = 1

API-IN: For top tutors \*max 5

```json
{
  "topTutors": [
    {
      "name": string,
      "avatar": string
    },
    ...
  ]
}
```

> Avatar url format is as per same as user's personal avatar url

### Post (Personal Feed, /forum)

API-OUT: Posting

```json
{
  "post": {
    "question": string,
    "tags": array[string]
  }
}
```

API-IN: Postcards - For Feed and Discussions

```json
{
  "data": [
    {
      "question": {
        "id": number,
        "tags": array[string],
        "time": datetime,
        "name": string,
        "title": string,
        "subscribe": boolean,
        "stats": {
          "votes": number,
          "answers": number,
          "views": number
        }
      },
      "answer"?: {
        "tags": array[string],
        "time": datetime,
        "name": string,
        "answer": string,
        "stats": {
          "votes": number,
          "comments": number,
          "views": number
        }
      }
    },
  ...
  ]
}
```

> Answer is omitted in Discussions this is optional

### All Topics (/forum/all-topics)

API-In

```json
{
  "topics": [
    {
      "topic": string,
      "active": datetime,
      "questions": number,
      "followers": number,
      "subscribe": array[string]
    },
    ...
  ]
}
```

> Topic can be changed to number if there is a id system for the different topic. Subscription can be omitted if being stored in Redux when getting Subjects & Interest

### Question

API-In

```json
{
  "post": [
    {
      "topic": string,
      "question": {
        "title": string,
        "text": string,
        "time": datetime,
        "views": number,
        "active": datetime,
        "votes": number,
        "vote": string,
        "tags": array[string],
        "name": string,
        "avatar": string,
        "comments": [
          {
            "comment": string,
            "votes": number,
            "vote": boolean,
            "name": string
          }
        ]
      },
      "answers": [
        {
          "text": string,
          "votes": number,
          "vote": string,
          "time": datetime,
          "name": string,
          "avatar": string,
          "comments": [
            {
              "comment": string,
              "votes": number,
              "vote": boolean,
              "name": string
            }
          ]
        }
      ]
    }
  ]
}
```

> "vote" under questions and answers is refering to if "up"/"down"/null which indicates if a vote has been casted as up or down or none

## Pages

- Personal Feed > /forum
- Subject/Interest Discussion > /forum/:topic
- All Topics > /forum/all-topics
