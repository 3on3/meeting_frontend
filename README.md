# :couple: 대학생 미팅 웹앱 “과팅”

![image](https://github.com/user-attachments/assets/e7916af6-bcc2-4b7a-ac75-f89e6a7046b1)
- 배포 URL : [gwating.com](http://gwating.com/)
  - 모바일 버전에 최적화되어있으므로 PC로 접속시 사이즈를 500 x 800으로 진행

<br>

## 프로젝트 소개

- 대학생 미팅 웹앱 과팅은 대학생들을 주요 타겟층으로하여 소통과 만남을 중개해주는 어플입니다.
- 학교나 학과 기반의 네트워크를 형성할 수 있고, 학생들이 좀 더 신뢰할 수 있는 인맥을 구축하는데 도움을 줄 수 있습니다.
- 만나고 싶은 지역에서 인원 수에 맞게 검색이 가능하여 과팅을 진행할 수 있습니다.
- 채팅을 통해 만남이 성사되기 전에 상대방이 어떠한지 미리 알 수 있습니다.
- 알람, 결제 등 과팅을 도와줄 다양한 시스템이 존재합니다.

<br>

## 팀원 구성

<div align="center">

| **진상훈** | **김요한** | **김은지** | **문지은** | **박진우** | **이예진** |
| :------: |  :------: | :------: | :------: | :------: | :------: |
| [<img src="https://github.com/user-attachments/assets/eb0b1087-f90f-4826-aafd-0dbd532c6dff" height=150 width=150> <br/> @hun2zz](https://github.com/hun2zz) | [<img src="https://github.com/user-attachments/assets/32af358c-6f8b-4349-a405-8672cc913999" height=150 width=150> <br/> @YoHan](https://github.com/yocong) | [<img src="https://github.com/user-attachments/assets/70b16d0a-95b1-4fe6-b107-56ba46dd0944" height=150 width=150> <br/> @silverji](https://github.com/eeungji) | [<img src="https://github.com/user-attachments/assets/6c461df5-5917-4f64-99fb-05b7766b2c73" height=150 width=150> <br/> @mizmizzz](https://github.com/mizmizzz) | [<img src="https://github.com/user-attachments/assets/9697e860-5143-46d9-9780-a0fe2e82f91c" height=150 width=150> <br/> @Jinwoo_Park](https://github.com/JinWooP98) | [<img src="https://github.com/user-attachments/assets/ed938ce3-09d0-4d6a-a828-781142766914" height=150 width=150> <br/> @jyaejin12](https://github.com/yaejin12) |

</div>

<br>

## 1. 개발 환경

- 개발 도구: Spring Boot
- 개발 주요 언어: JAVA / JPA  / JSX / JAVASCRIPT / AJAX / HTML / CSS / SCSS
- 라이브러리: REACT / REDIS / WEBSOCKET
- DB: Maria DB / MYSQL
- 배포: AWS / Docker / Github Action
- 툴 : GitHub / Notion / Discord / Google Calender / Figma / Postman / Blank Diagram
- API: KaKao 결제 API / 대학인증메일 (UnivCert) API
<br>

## 2. 브랜치 전략

- Git-flow 전략을 기반으로 main, main2, update 브랜치를 운용했습니다.
    - **main** 브랜치는 최종 결과물로 사용하는 브랜치입니다.
    - **main2** 브랜치는 개발 단계에서 git-flow의 main 역할을 하는 브랜치입니다.
    - **update** 브랜치는 배포 단계에서 필요한 신기능 개발을 위한 브랜치입니다.

<br>

## 3. 프로젝트 구조

```
---src
    +---main
    |   +---java
    |   |   \---com
    |   |       \---project
    |   |           \---api
    |   |               +---auth
    |   |               |   \---filter
    |   |               +---config
    |   |               +---exception
    |   |               +---handler
    |   |               \---metting
    |   |                   +---controller
    |   |                   +---dto
    |   |                   |   +---request
    |   |                   |   \---response
    |   |                   +---entity
    |   |                   +---repository
    |   |                   +---service
    |   |                   \---util
    |   +---resources
    |   |   +---mapper
    |   |   \---static
    |   |       \---assets
    |   |           +---css
    |   |           +---img
    |   |           \---js
    |   \---webapp
    |       \---WEB-INF
    |           \---views
    \---test
        \---java
            \---com
                \---project
                    \---api
                        +---auth
                        \---metting
                            +---controller
                            +---entity
                            +---repository
                            \---service
```
```
📦src
 ┣ 📂assets
 ┃ ┣ 📂css
 ┃ ┃ ┣ 📜common.css
 ┃ ┃ ┗ 📜reset.css
 ┃ ┣ 📂fonts
 ┃ ┃ ┗ 📂pretendard
 ┃ ┃ ┃ ┣ 📜Pretendard-Black.woff
 ┃ ┃ ┃ ┣ 📜Pretendard-Bold.woff
 ┃ ┃ ┃ ┣ 📜Pretendard-ExtraBold.woff
 ┃ ┃ ┃ ┣ 📜Pretendard-ExtraLight.woff
 ┃ ┃ ┃ ┣ 📜Pretendard-Light.woff
 ┃ ┃ ┃ ┣ 📜Pretendard-Medium.woff
 ┃ ┃ ┃ ┣ 📜Pretendard-Regular.woff
 ┃ ┃ ┃ ┣ 📜Pretendard-SemiBold.woff
 ┃ ┃ ┃ ┗ 📜Pretendard-Thin.woff
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📂icons
 ┃ ┃ ┃ ┣ 📜c-camera.svg
 ┃ ┃ ┃ ┣ 📜c-chat-hamburger.svg
 ┃ ┃ ┃ ┣ 📜c-chat-send.svg
 ┃ ┃ ┃ ┣ 📜c-chat.svg
 ┃ ┃ ┃ ┣ 📜c-copy.svg
 ┃ ┃ ┃ ┣ 📜c-crown.svg
 ┃ ┃ ┃ ┣ 📜c-edit-board.svg
 ┃ ┃ ┃ ┣ 📜c-group-settings.svg
 ┃ ┃ ┃ ┣ 📜c-logo.svg
 ┃ ┃ ┃ ┣ 📜c-modal-close.svg
 ┃ ┃ ┃ ┣ 📜c-scr-arrow.svg
 ┃ ┃ ┃ ┣ 📜c-user-group-solid.svg
 ┃ ┃ ┃ ┣ 📜c-user.svg
 ┃ ┃ ┃ ┣ 📜c-view.svg
 ┃ ┃ ┃ ┣ 📜h-alarmActiveBtn.svg
 ┃ ┃ ┃ ┣ 📜h-alarmBtn.svg
 ┃ ┃ ┃ ┣ 📜h-board-active.svg
 ┃ ┃ ┃ ┣ 📜h-board.svg
 ┃ ┃ ┃ ┣ 📜h-chat-active.svg
 ┃ ┃ ┃ ┣ 📜h-chat.svg
 ┃ ┃ ┃ ┣ 📜h-chevron-left-solid.svg
 ┃ ┃ ┃ ┣ 📜h-group-active.svg
 ┃ ┃ ┃ ┣ 📜h-group.svg
 ┃ ┃ ┃ ┣ 📜h-home-active.svg
 ┃ ┃ ┃ ┣ 📜h-home.svg
 ┃ ┃ ┃ ┣ 📜h-messageBox.svg
 ┃ ┃ ┃ ┣ 📜h-mypage-active.svg
 ┃ ┃ ┃ ┣ 📜h-mypage.svg
 ┃ ┃ ┃ ┣ 📜h-plus.svg
 ┃ ┃ ┃ ┣ 📜icon-correct-D.svg
 ┃ ┃ ┃ ┣ 📜icon-correct.svg
 ┃ ┃ ┃ ┣ 📜icon-error.svg
 ┃ ┃ ┃ ┣ 📜m-check-active-B.svg
 ┃ ┃ ┃ ┣ 📜m-check-active.svg
 ┃ ┃ ┃ ┣ 📜m-check.svg
 ┃ ┃ ┃ ┣ 📜m-close-more.svg
 ┃ ┃ ┃ ┣ 📜m-more.svg
 ┃ ┃ ┃ ┗ 📜m-personnel.svg
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┣ 📜defaultProfile.png
 ┃ ┃ ┃ ┗ 📜logo.svg
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┣ 📜check.svg
 ┃ ┃ ┃ ┣ 📜coong.jpg
 ┃ ┃ ┃ ┣ 📜payment.svg
 ┃ ┃ ┃ ┗ 📜pen.svg
 ┃ ┃ ┗ 📜profile.jpg
 ┃ ┗ 📂js
 ┃ ┃ ┣ 📂test-chat
 ┃ ┃ ┃ ┣ 📜TestChat.js
 ┃ ┃ ┃ ┣ 📜TestChatFetch.js
 ┃ ┃ ┃ ┗ 📜TestChatWebSocket.js
 ┃ ┃ ┣ 📂webSocket
 ┃ ┃ ┃ ┗ 📜MainWebSocket.js
 ┃ ┃ ┗ 📜Verification.js
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂buttons
 ┃ ┃ ┃ ┣ 📂checkboxbutton
 ┃ ┃ ┃ ┃ ┣ 📜Checkbox.jsx
 ┃ ┃ ┃ ┃ ┣ 📜Checkbox.module.scss
 ┃ ┃ ┃ ┃ ┗ 📜CheckboxButtonGroup.jsx
 ┃ ┃ ┃ ┣ 📂matchingButton
 ┃ ┃ ┃ ┃ ┣ 📜MatchingButton.jsx
 ┃ ┃ ┃ ┃ ┗ 📜MatchingButton.module.scss
 ┃ ┃ ┃ ┣ 📂radiobutton
 ┃ ┃ ┃ ┃ ┣ 📜RadioButton.jsx
 ┃ ┃ ┃ ┃ ┣ 📜RadioButton.module.scss
 ┃ ┃ ┃ ┃ ┗ 📜RadioButtonChil.jsx
 ┃ ┃ ┃ ┣ 📜DefaultButton.js
 ┃ ┃ ┃ ┣ 📜MtButtons.jsx
 ┃ ┃ ┃ ┗ 📜MtButtons.module.scss
 ┃ ┃ ┣ 📂groupBoxs
 ┃ ┃ ┃ ┣ 📜GroupBox.jsx
 ┃ ┃ ┃ ┣ 📜GroupBox.module.scss
 ┃ ┃ ┃ ┗ 📜RequestBtns.jsx
 ┃ ┃ ┣ 📂inputs
 ┃ ┃ ┃ ┣ 📜DefaultInput.jsx
 ┃ ┃ ┃ ┗ 📜DefaultInput.module.scss
 ┃ ┃ ┣ 📂loading
 ┃ ┃ ┃ ┣ 📜Loading.jsx
 ┃ ┃ ┃ ┗ 📜Loading.module.scss
 ┃ ┃ ┣ 📂modal
 ┃ ┃ ┃ ┣ 📜InviteModal.jsx
 ┃ ┃ ┃ ┣ 📜InviteModal.module.scss
 ┃ ┃ ┃ ┣ 📜ModalLayout.jsx
 ┃ ┃ ┃ ┣ 📜ModalLayout.module.scss
 ┃ ┃ ┃ ┣ 📜PaymentChoiceModal.jsx
 ┃ ┃ ┃ ┗ 📜PaymentChoiceModal.module.scss
 ┃ ┃ ┣ 📂regionFilterBoxs
 ┃ ┃ ┃ ┣ 📜RegionFilterBox.jsx
 ┃ ┃ ┃ ┗ 📜RegionFilterBox.module.scss
 ┃ ┃ ┗ 📂scroll-section
 ┃ ┃ ┃ ┣ 📜ScrollSection.jsx
 ┃ ┃ ┃ ┗ 📜ScrollSection.module.scss
 ┃ ┣ 📂memberList
 ┃ ┃ ┣ 📜MemberList.jsx
 ┃ ┃ ┗ 📜MemberList.module.scss
 ┃ ┣ 📂myGroupSelectModal
 ┃ ┃ ┣ 📜MyGroupSelectModal.jsx
 ┃ ┃ ┗ 📜MyGroupSelectModal.module.scss
 ┃ ┗ 📂textarea
 ┃ ┃ ┣ 📜Textarea.jsx
 ┃ ┃ ┗ 📜Textarea.module.scss
 ┣ 📂config
 ┃ ┣ 📜auth.js
 ┃ ┣ 📜host-config.js
 ┃ ┗ 📜route-config.js
 ┣ 📂context
 ┃ ┣ 📜MainWebSocketContext.js
 ┃ ┣ 📜ModalContext.js
 ┃ ┗ 📜ModalProvider.js
 ┣ 📂hook
 ┃ ┣ 📜useFetchGet.js
 ┃ ┗ 📜useFetchRequest.js
 ┣ 📂layout
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜FloatingNavigation.jsx
 ┃ ┃ ┗ 📜MainNavigation.jsx
 ┃ ┣ 📜alarm.module.scss
 ┃ ┣ 📜alarmFetch.js
 ┃ ┣ 📜Header.js
 ┃ ┣ 📜Header.module.scss
 ┃ ┗ 📜RootLayout.js
 ┣ 📂pages
 ┃ ┣ 📂alarm
 ┃ ┃ ┣ 📂component
 ┃ ┃ ┃ ┗ 📜AlarmContent.jsx
 ┃ ┃ ┣ 📜AlarmPage.js
 ┃ ┃ ┗ 📜AlarmPage.module.scss
 ┃ ┣ 📂board
 ┃ ┃ ┣ 📂boardModify
 ┃ ┃ ┃ ┣ 📜BoardModify.js
 ┃ ┃ ┃ ┗ 📜BoardModify.module.scss
 ┃ ┃ ┣ 📂boardWrite
 ┃ ┃ ┃ ┣ 📜BoardWrite.js
 ┃ ┃ ┃ ┗ 📜BoardWrite.module.scss
 ┃ ┃ ┣ 📂board_detail
 ┃ ┃ ┃ ┣ 📜BoardDetail.js
 ┃ ┃ ┃ ┗ 📜BoardDetail.module.scss
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂modal
 ┃ ┃ ┃ ┃ ┣ 📜ConfirmDelBoard.jsx
 ┃ ┃ ┃ ┃ ┣ 📜CreateBoardModal.jsx
 ┃ ┃ ┃ ┃ ┗ 📜CreateBoardModal.module.scss
 ┃ ┃ ┃ ┣ 📜BoardBox.jsx
 ┃ ┃ ┃ ┣ 📜BoardList.jsx
 ┃ ┃ ┃ ┣ 📜DetailBody.jsx
 ┃ ┃ ┃ ┣ 📜DetailBottom.jsx
 ┃ ┃ ┃ ┣ 📜DetailHead.jsx
 ┃ ┃ ┃ ┣ 📜EmptyBoard.jsx
 ┃ ┃ ┃ ┣ 📜EmptyBoard.module.scss
 ┃ ┃ ┃ ┣ 📜MyBoardList.jsx
 ┃ ┃ ┃ ┣ 📜ReplyBox.jsx
 ┃ ┃ ┃ ┗ 📜TabBox.jsx
 ┃ ┃ ┣ 📜Board.js
 ┃ ┃ ┗ 📜Board.module.scss
 ┃ ┣ 📂chat
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂chatDelete_Modal
 ┃ ┃ ┃ ┃ ┗ 📜ChatDeleteModal.jsx
 ┃ ┃ ┃ ┣ 📂member_modal
 ┃ ┃ ┃ ┃ ┗ 📜ChatMembersModal.jsx
 ┃ ┃ ┃ ┣ 📜ChatBody.jsx
 ┃ ┃ ┃ ┣ 📜ChatHead.jsx
 ┃ ┃ ┃ ┣ 📜ChatInput.jsx
 ┃ ┃ ┃ ┣ 📜ChatMenu.jsx
 ┃ ┃ ┃ ┣ 📜MessageBox.jsx
 ┃ ┃ ┃ ┗ 📜MessageContent.jsx
 ┃ ┃ ┣ 📂js
 ┃ ┃ ┃ ┣ 📜ChatFetch.js
 ┃ ┃ ┃ ┗ 📜ChatWebSocket.js
 ┃ ┃ ┣ 📜Chat.js
 ┃ ┃ ┗ 📜Chat.module.scss
 ┃ ┣ 📂error
 ┃ ┃ ┣ 📜ErrorPage.js
 ┃ ┃ ┗ 📜ErrorPage.module.scss
 ┃ ┣ 📂group
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂modal
 ┃ ┃ ┃ ┃ ┣ 📜GroupCreateModal.jsx
 ┃ ┃ ┃ ┃ ┣ 📜GroupCreateModal.module.scss
 ┃ ┃ ┃ ┃ ┣ 📜GroupDeleteModal.jsx
 ┃ ┃ ┃ ┃ ┣ 📜GroupDeleteModal.module.scss
 ┃ ┃ ┃ ┃ ┣ 📜GroupDelModal.jsx
 ┃ ┃ ┃ ┃ ┣ 📜GroupDelModal.module.scss
 ┃ ┃ ┃ ┃ ┣ 📜GroupExileModal.jsx
 ┃ ┃ ┃ ┃ ┣ 📜GroupExileModal.module.scss
 ┃ ┃ ┃ ┃ ┣ 📜GroupInviteModal.jsx
 ┃ ┃ ┃ ┃ ┣ 📜GroupInviteModal.module.scss
 ┃ ┃ ┃ ┃ ┣ 📜GroupLeaveModal.jsx
 ┃ ┃ ┃ ┃ ┣ 📜GroupLeaveModal.module.scss
 ┃ ┃ ┃ ┃ ┣ 📜GroupSettingModal.jsx
 ┃ ┃ ┃ ┃ ┗ 📜RequestModal.jsx
 ┃ ┃ ┃ ┣ 📂skeleton
 ┃ ┃ ┃ ┃ ┣ 📜GroupViewBody.module.scss
 ┃ ┃ ┃ ┃ ┣ 📜GroupViewBodySkeleton.jsx
 ┃ ┃ ┃ ┃ ┣ 📜GroupViewHead.module.scss
 ┃ ┃ ┃ ┃ ┗ 📜GroupViewHeadSkeleton.jsx
 ┃ ┃ ┃ ┣ 📜GroupLeader.jsx
 ┃ ┃ ┃ ┣ 📜GroupViewBody.jsx
 ┃ ┃ ┃ ┣ 📜GroupViewBottom.jsx
 ┃ ┃ ┃ ┣ 📜GroupViewHead.jsx
 ┃ ┃ ┃ ┗ 📜Information.jsx
 ┃ ┃ ┣ 📜Group.js
 ┃ ┃ ┣ 📜Group.module.scss
 ┃ ┃ ┣ 📜GroupCreate.js
 ┃ ┃ ┗ 📜GroupCreate.module.scss
 ┃ ┣ 📂invite
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜JoinEndPage.jsx
 ┃ ┃ ┃ ┣ 📜JoinEndPage.module.scss
 ┃ ┃ ┃ ┗ 📜JoinGroupWithInvite.jsx
 ┃ ┃ ┗ 📜InvitePage.js
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂find_password
 ┃ ┃ ┃ ┃ ┣ 📜ConfirmIdentityModal.jsx
 ┃ ┃ ┃ ┃ ┣ 📜ConfirmIdentityModal.module.scss
 ┃ ┃ ┃ ┃ ┣ 📜NewPasswordModal.jsx
 ┃ ┃ ┃ ┃ ┗ 📜NewPasswordModal.module.scss
 ┃ ┃ ┃ ┣ 📂ProfileModal
 ┃ ┃ ┃ ┃ ┣ 📜ProfileMenuModal.jsx
 ┃ ┃ ┃ ┃ ┗ 📜ProfileMenuModal.module.scss
 ┃ ┃ ┃ ┣ 📜FirstLoginNickName.jsx
 ┃ ┃ ┃ ┣ 📜FirstLoginNickName.module.scss
 ┃ ┃ ┃ ┣ 📜FirstLoginProfile.jsx
 ┃ ┃ ┃ ┣ 📜FirstLoginProfile.module.scss
 ┃ ┃ ┃ ┣ 📜PasswordResetPage.jsx
 ┃ ┃ ┃ ┗ 📜PasswordResetPage.module.scss
 ┃ ┃ ┣ 📜FirstLoginPage.js
 ┃ ┃ ┣ 📜IntroPage.js
 ┃ ┃ ┣ 📜IntroPage.module.scss
 ┃ ┃ ┣ 📜LoginPage.js
 ┃ ┃ ┗ 📜LoginPage.module.scss
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜MainFilter.jsx
 ┃ ┃ ┃ ┣ 📜MainFilter.module.scss
 ┃ ┃ ┃ ┣ 📜MeetingList.jsx
 ┃ ┃ ┃ ┣ 📜MeetingList.module.scss
 ┃ ┃ ┃ ┣ 📜RegionFilter.jsx
 ┃ ┃ ┃ ┗ 📜RegionFilter.module.scss
 ┃ ┃ ┣ 📜EmptyGroups.js
 ┃ ┃ ┣ 📜Main.js
 ┃ ┃ ┗ 📜Main.module.scss
 ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂mypage_modal
 ┃ ┃ ┃ ┃ ┣ 📜MypageModal.jsx
 ┃ ┃ ┃ ┃ ┗ 📜MypageModal.module.scss
 ┃ ┃ ┃ ┣ 📜ActionSection.jsx
 ┃ ┃ ┃ ┣ 📜ActionSection.module.scss
 ┃ ┃ ┃ ┣ 📜ProfileImage.jsx
 ┃ ┃ ┃ ┣ 📜ProfileImage.module.scss
 ┃ ┃ ┃ ┣ 📜ProfileSection.jsx
 ┃ ┃ ┃ ┗ 📜ProfileSection.module.scss
 ┃ ┃ ┣ 📂modify_information
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┣ 📂modal
 ┃ ┃ ┃ ┃ ┃ ┣ 📜PasswordUpdateModal.jsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜PasswordUpdateModal.module.scss
 ┃ ┃ ┃ ┃ ┃ ┣ 📜PhoneNumberUpdateModal.jsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜PhoneNumberUpdateModal.module.scss
 ┃ ┃ ┃ ┃ ┣ 📜ConfirmWithdraw.jsx
 ┃ ┃ ┃ ┃ ┣ 📜DisabledInfoInputs.jsx
 ┃ ┃ ┃ ┃ ┣ 📜DisabledInformations.jsx
 ┃ ┃ ┃ ┃ ┣ 📜EmailInput.jsx
 ┃ ┃ ┃ ┃ ┣ 📜EnableInputInformation.jsx
 ┃ ┃ ┃ ┃ ┣ 📜EnableInputInputs.jsx
 ┃ ┃ ┃ ┃ ┣ 📜PasswordInput.jsx
 ┃ ┃ ┃ ┃ ┗ 📜VerificationInput.jsx
 ┃ ┃ ┃ ┣ 📂withdraw
 ┃ ┃ ┃ ┃ ┣ 📜Withdraw.js
 ┃ ┃ ┃ ┃ ┗ 📜Withdraw.module.scss
 ┃ ┃ ┃ ┣ 📜CheckPass.js
 ┃ ┃ ┃ ┣ 📜CheckPass.module.scss
 ┃ ┃ ┃ ┣ 📜ModifyInformation.js
 ┃ ┃ ┃ ┗ 📜ModifyInformation.module.scss
 ┃ ┃ ┣ 📂mypage_chats
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┗ 📜MyChatList.jsx
 ┃ ┃ ┃ ┣ 📜MyChatFetch.js
 ┃ ┃ ┃ ┣ 📜MyChats.js
 ┃ ┃ ┃ ┗ 📜MyChats.module.scss
 ┃ ┃ ┣ 📂mypage_groups
 ┃ ┃ ┃ ┣ 📜MyGroups.js
 ┃ ┃ ┃ ┗ 📜MyGroups.module.scss
 ┃ ┃ ┗ 📜MyPage.js
 ┃ ┣ 📂payment
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┗ 📂modal
 ┃ ┃ ┃ ┃ ┣ 📜PaymentModal.jsx
 ┃ ┃ ┃ ┃ ┣ 📜PaymentModal.module.scss
 ┃ ┃ ┃ ┃ ┣ 📜SuccessModal.jsx
 ┃ ┃ ┃ ┃ ┗ 📜SuccessModal.module.scss
 ┃ ┃ ┣ 📜Payment.js
 ┃ ┃ ┣ 📜PaymentApproval.js
 ┃ ┃ ┗ 📜PaymentApproval.module.scss
 ┃ ┗ 📂sign_up
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂create_email
 ┃ ┃ ┃ ┃ ┣ 📜CreateEmail.jsx
 ┃ ┃ ┃ ┃ ┣ 📜EmailInput.jsx
 ┃ ┃ ┃ ┃ ┣ 📜EmailInput.module.scss
 ┃ ┃ ┃ ┃ ┣ 📜MajorInput.jsx
 ┃ ┃ ┃ ┃ ┗ 📜VerificationInput.jsx
 ┃ ┃ ┃ ┣ 📂create_informations
 ┃ ┃ ┃ ┃ ┗ 📜CreateInformation.jsx
 ┃ ┃ ┃ ┣ 📂create_password
 ┃ ┃ ┃ ┃ ┗ 📜CreatePassword.jsx
 ┃ ┃ ┃ ┣ 📜SignUpComplete.jsx
 ┃ ┃ ┃ ┗ 📜SignUpComponent.module.scss
 ┃ ┃ ┣ 📜SignUp.js
 ┃ ┃ ┗ 📜SignUp.module.scss
 ┣ 📂store
 ┃ ┣ 📜index.js
 ┃ ┣ 📜Login-slice.js
 ┃ ┗ 📜MainFilterLoading-slice.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜index.css
 ┗ 📜index.js
```


<br>

## 4. 역할 분담

### :smirk: 진상훈

- **기능**
    - 미팅 그룹 생성/삭제, 그룹 참여자 초대코드생성/수락/거절/추방, 회원 탈퇴, 이메일 인증, 배포, Docker
<br>
    
### :smiley: 김요한

- **기능**
    - 대학 이메일 인증, 회원가입, 로그인/자동로그인, 멤버십 조회/결제, 배포, Docker

<br>

### :flushed: 김은지

- **기능**
    - 마이페이지 회원 정보 조회/수정, 프로필 이미지 조회/수정, 배포, Docker

<br>

### :wink: 문지은

- **기능**
    - 미팅 그룹 매칭 신청/수락/거절, 채팅 방 생성, 게시판 조회/생성/수정/삭제, 배포, Docker
    
<br>

### :stuck_out_tongue: 박진우

- **기능**
    - 채팅 전송, 채팅 방 조회/삭제, 채팅 참여 유저 조회, 매칭 알림 조회/전송, 배포, Docker
    
<br>

### :stuck_out_tongue_closed_eyes: 이예진

- **기능**
    - 미팅 그룹 조회/필터링, 게시판 덧글 생성/수정/삭제, 배포, Docker
    
<br>

### :muscle: 공통

- **UI**
    - 디자인
    
<br>

## 5. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2024-07-17 ~ 2024-08-29

<br>

### 작업 관리

- Discord와 Notion을 사용하여 진행 상황을 공유했습니다.
- 매일 회의를 진행하여 작업 순서와 방향성에 대한 고민을 나누고 Notion에 회의 내용을 기록했습니다.

<br>

## 6. 페이지별 기능

<br>

### [회원가입]
- 대학인증메일 API를 사용하여 대학명, 대학 메일을 입력 후 인증 코드 확인
- 이후 이름, 생년월일, 전화번호, 비밀번호를 입력받아 회원가입 완료
- 생년월일 필터링
- 전화번호 중복 확인 검증 가능

| 회원가입 | 비밀번호 찾기 |
|----------|----------|
|![image](https://github.com/user-attachments/assets/74d2e4e1-05f3-4371-9bb8-cc4473a5ed68)|![image](https://github.com/user-attachments/assets/4a91a23b-5fe7-4f0d-8744-ccd5a324c034)|

<br>

### [로그인]
- 아이디와 비밀번호를 입력하고 자동로그인 여부 선택가능
- 최초 로그인시, 프로필 이미지와 닉네임을 설정가능
- 비밀번호 찾기를 통해 비밀번호 변경하여 로그인 가능
- 닉네임 중복 확인 검증 가능

| 로그인 | 프로필 설정 | 닉네임 설정 |
|----------|----------|----------|
|![image](https://github.com/user-attachments/assets/a06cd7ad-4de8-4184-ac94-eda89034401a)|![image](https://github.com/user-attachments/assets/a5b7a25a-3307-4a3f-86af-6d4b44687410)|![image](https://github.com/user-attachments/assets/1f7129dc-ba9f-4f6d-a284-837249ff92a2)|

<br>

### [마이페이지]
- 이메일 확인  ->  인증코드 확인  ->  비밀번호 확인 절차를 거쳐 회원 탈퇴 진행
- 내가 속한 그룹 및 내가 속한 채팅 조회
- 기본 정보 조회 및 변경 (닉네임 / 자기소개 / 전공 / 나이 / 멤버십 등급 ) 
- 기본 프로필 이미지 설정
- 원하는 프로필 이미지 설정
- 비밀번호 & 연락처 변경
- 연락처 중복 확인

| 마이페이지 | 회원정보 수정 | 회원탈퇴 |
|----------|----------|----------|
|![image](https://github.com/user-attachments/assets/83da18b8-1917-4677-b52c-c65afcaa86e6)|![image](https://github.com/user-attachments/assets/a6f3be89-bf61-445c-8fe7-0495dec9f4a3)|![image](https://github.com/user-attachments/assets/b21d5aa1-a59f-4d5b-9c8d-d802e99148f6)|

<br>

### [메인페이지]
- 미팅을 원하는 사용자 그룹 목록 조회 가능
- 매칭 신청 버튼 클릭 시 빠르게 주최자 그룹에 매칭 신청 가능
- 성별 & 참여 인원 (3:3 / 4:4 / 5:5) & 원하는 지역 선택 시 해당 조건에 따라 필터링 된 그룹 목록만 열람 가능
- 무한스크롤 가능

| 메인 |
|----------|
|![image](https://github.com/user-attachments/assets/26aa0a91-6072-4e09-aad0-23871a9a1c1b)|

<br>

### [그룹]
- 그룹의 상세정보 확인 기능
- 참여자별 상태 (초대중 / 참여수락 / 참여거절) 확인 가능
- 설정 메뉴를 통해 초대코드 복사, 그룹 삭제, 참여자 추방 기능
- 미팅을 주최하고 싶은 사용자가 미팅 그룹을 생성
- 그룹 생성 시 초대코드 함께 생성 미팅을 함께 하고 싶은 친구에게 초대코드 발송
- 주최자한테 초대 받은 사람이 참여 링크로 이동 시 미팅 그룹에 참여 신청이 완료


| 내 그룹 | 그룹 디테일 | 그룹 생성 |
|----------|----------|----------|
|![image](https://github.com/user-attachments/assets/d919c9f9-f5de-4b13-b913-cadb755814fd)|![image](https://github.com/user-attachments/assets/0df4e748-33d3-46db-b6b3-ae0a6ee0912c)|![image](https://github.com/user-attachments/assets/38a3ec6d-ae92-44a1-84e6-5032ef23d49f)|

<br>

### 그룹 매칭
- 신청자그룹에서 주최자그룹에 매칭 신청
- 희망지역 / 참여인원 일치하고 이성 그룹일 때 신청 가능
- 주최자 그룹에 매칭신청 수락시 채팅방 생성 및 입장
- 주최자 그룹에 매칭신청 수락 또는 거절
- 주최자 그룹에서 수락시 채팅방 생성
- 거절시 나머지 신청 그룹 거절 처리

| 그룹 매칭 |
|----------|
|![image](https://github.com/user-attachments/assets/1086d914-575c-4db6-be97-2d8b4547c297)|

<br>

### [채팅]
- 상단 메뉴에 채팅 참여 유저 버튼 클릭 시 채팅에 참여중인 유저 정보 조회 가능
- 그룹별 유저 조회 가능
- 상단 메뉴에 채팅 삭제 버튼 클릭 시 채팅 삭제 가능
- 채팅 삭제 시 채팅이 종료되었다는 메세지 출력
  - 채팅 삭제시 참여하고 있는 그룹도 같이 삭제
- 채팅방 입장 시 해당 채팅방의 채팅 렌더링
- 실시간 채팅 가능

| 채팅 |
|----------|
|![image](https://github.com/user-attachments/assets/1020b3a6-5c83-4129-b883-ffed4ae02373)|

<br>

### [익명게시판]
- 새 게시글 등록 버튼을 통해 작성 폼 으로 이동
- 제목과 내용을 입력하고 확인 버튼을 클릭하면 새 게시글 등록
- 익명으로 게시된 자유주제 게시글을 열람 가능
- 각 게시물에 익명으로 댓글 작성 가능
  - 내가 작성한 댓글이라면 삭제 가능
- 내가 쓴 글 탭을 클릭하면 사용자가 작성한 게시글 목록 열람 가능
- 해당 게시물들은 수정, 삭제 가능

| 게시판 목록 | 게시글 | 게시글 생성|
|----------|----------|----------|
|![image](https://github.com/user-attachments/assets/490bc819-a808-4d07-9e53-be838d611d1f)|![image](https://github.com/user-attachments/assets/ecd69d71-15b7-4dfd-bc50-8f90da485ceb)|![image](https://github.com/user-attachments/assets/32b12312-eb06-406e-b357-b7d5eba687c5)|

<br>

### [멤버십]
- GENERAL 등급
- PREMIUM 등급
  - 프로필 열람, 그룹 생성 수 증가
  - HOST로 있는 그룹에 들어온 매칭 요청을 조회 가능
- 카카오페이 API 를 활용하여 모바일 결제 구현
- 상대방 프로필을 누를 시 또는 마이페이지에서 결제 가능

| 멤버십 결제 준비 | 멤버십 결제 완료 |
|----------|----------|
|![image](https://github.com/user-attachments/assets/0b327c66-8b97-4d54-9806-3d9b4148982e)|![image](https://github.com/user-attachments/assets/0196a24a-ae4b-4130-8fbe-6c81087663c2)|


<br>

### [알림]
- 사용자가 HOS로 있는 그룹에 매칭 신청이 들어오면 실시간으로 알림 메세지 전송
- 자신이 HOST로 있는 그룹에 들어온 매칭 요청을 조회 가능
- 알림을 클릭하면 매칭 신청이 들어온 그룹페이지로 이동

| 알림 |
|----------|
|![image](https://github.com/user-attachments/assets/8bb32203-3fe4-4061-8a5c-59377587a52e)|

<br>

## 7. 트러블 슈팅

| 문지은 |
|----------|
![image](https://github.com/user-attachments/assets/8323a84c-8b0e-45c0-9ffb-071efc6ee436)


| 박진우 |
|----------|
![image](https://github.com/user-attachments/assets/e8de6252-174e-4176-861a-c114044fddcf)

| 김요한 |
|----------|
![image](https://github.com/user-attachments/assets/863b56d5-f686-420f-8d0b-1fad2b2420e2)

| 김은지 |
|----------|
![image](https://github.com/user-attachments/assets/2d4b65b4-ca88-49ec-b721-9381f9536dbe)

| 이예진 | 
|----------|
![image](https://github.com/user-attachments/assets/aef9372e-dfeb-46c2-b393-5a40828919f2)

| 진상훈 |
|----------|
![image](https://github.com/user-attachments/assets/03288fc8-0af5-4783-9c3b-a668fe65fd0b)



<br>

## 8. 향후 업데이트

### 채팅
- 이미지 전송 기능
- 메세지 공지사항 등록 기능
- 채팅 메세지 알림 기능

### 마이페이지
- 사용자 신고/차단 기능
- 사용자 연락처 동기화
- 멤버십 프리미엄 결제 혜택 개선

### 익명게시판
- 게시글 좋아요 기능
- 댓글 기능

### 알람
- 매칭 신청 알림 뿐만 아니라 
- 신청 수락, 거절에 대한 
- 실시간 알림 처리
<br>
