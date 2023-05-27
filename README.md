## 🎬 3차 과제 : API를 활용한 To do 만들기
<br>

> 작성자 : 양준용 - 4조  

<br>

[결과물](https://kdt5-yangjunyong-todolist.netlify.app/)  

<br>

> HTML, CSS, JS, React 활용

<br><br>


## 필수 요구사항

- [x] 할 일 목록(List)이 출력돼야 합니다.
- [x] 할 일 항목(Item)을 새롭게 추가할 수 있어야 합니다.
- [x] 할 일 항목을 수정할 수 있어야 합니다.
- [x] 할 일 항목을 삭제할 수 있어야 합니다.
- [x] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

<br>

## 선택 요구사항

- [x] 할 일 항목의 순서를 바꿀 수 있도록 만들어보세요. (추천 라이브러리 - [SortableJS](http://sortablejs.github.io/Sortable/))
- [x] 할 일을 완료하지 않은 항목과 완료한 항목을 분류해서 출력해보세요.
- [ ] 할 일을 완료한 항목을 한 번에 삭제할 수 있도록 만들어보세요.
- [x] 할 일 항목의 최신 수정일을 표시해보세요.
- [ ] 할 일 목록이 출력되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [ ] 기타 동작이 완료되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.
- [ ] 할 일과 관련된 기타 기능도 고려해보세요.

<br><br>

## 화면구성
|Home|
|:--:|
|![](https://github.com/azure0929/todo-list/assets/128226527/e13d7ab2-a509-428d-b3e6-b17944a932e8)|
|스크롤 - overflow : scroll|
|![](https://github.com/azure0929/todo-list/assets/128226527/f183b815-4482-401f-88a7-15a5eea0fb1d)|
|할 일 추가 및 삭제|
|![](https://github.com/azure0929/todo-list/assets/128226527/eff9697e-01e1-45a5-b477-f37113655092)|
|할 일 완료|
|![](https://github.com/azure0929/todo-list/assets/128226527/3b098ae4-aee9-4c43-b0c0-db029e4c3635)|

<br><br>

## 주요기능
<br>

### 1. 스크롤 기능  

- overflow: scroll;를 주어서 넘친다면 스크롤 기능으로 내용을 볼 수 있도록 설정

```css
overflow: scroll;
```
<br>

---

<br>

### 2. 현재 날짜 출력  

- {today.year}.{today.month}.{today.date} 활용

```js
<div className="today-content-date-detail">
  <div>{today.year}.{today.month}.{today.date}</div> 
</div>
```

<br>

---

<br><br>

## 어려웠던 점 
- loading 기능 구현에 대한 지식 부족
- 완료한 항목 전체를 삭제 할 수 있는 기능 구현에 대한 지식 부족

<br>

## 궁금한 점 
- 이번 과제에 페이스북에서 만든 자바스크립트 패키지 매니저인 yarn을 활용했습니다. npm보다 속도나 안전성이 우수하다는 것을 알게 되었습니다. yarn으로 진행하다가 package들 간의 버전 문제가 발생해서 node-sass@4.14.1로 적용을 해보았지만 실패하여 css로 각 component 별로 import 방식으로 적용했습니다. node-sass@4.14.1 이외에 버전 문제를 해결하는 방법이 있다면 조언 부탁드립니다.