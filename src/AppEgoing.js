import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// 1장.React의 특징은 사용자 정의 태그를 만들 수 있다는 점
// 여기서 사용자 정의 태그는 Component 컴포넌트라고 지칭한다.
// 2장.Html의 태그는 속성(attribute)이라 부르고 React의 속성은 props라 부른다.

// Component 1 Header
function Header(props) {
  console.log('props', props, props.title);
  return       <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1> 
</header> // 중괄호({}) 사이에 있는 문자열은 -> 표현식으로 되어 결과를 페이지에 표시한다
}

// 2 Navigation
function Navigation(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++){
    let t = props.topics[i];  
    lis.push(<li key={t.id}><a id={t.id} href={"/read" + t.id} onClick={event => {
      event.preventDefault();
      props.onChangeMode(Number(event.target.id));
      // id값을 가져오기 위해서 a태그 내에 id 속성을 만들고, 이벤트 객체내의 target(이벤트를 유발시킨 태그)에 .id
    }}>{t.title}</a>
    </li>)
  }
  return <nav>
  <ol>
    {lis}
  </ol>
</nav>
}

// 3 Article
function Article(props) {
  return  <article>
    <h2>{props.title}</h2>
    {props.body}
</article> 
}

// 4 Create
function Create(props) {// 가져온 title과 body를 컴퍼넌트의 사용자에게 공급해야함 어떻게? 밑에 onCreate로 부터! onCreate-> prop이며 공급받기 위해서 전달값(param)을 props으로 적어줌
  return <article>
    <h2>Create</h2>
    <form onSubmit={event => { // onSubmit = submit을 클릭했을때 form태그에서 발생하는 event-> 페이지가 리로드됨
      event.preventDefault(); // 페이지 리로드 방지
      const title = event.target.title.value; // event가 발생했을때, 미리 적어놨던 title을 가져와야함! .value
      // event.target은 event에서 발생한 태그(form)를 가르킴[submit을 눌렀을때 생긴 event는 form태그에서 발생한것이기때문]
      const body = event.target.body.value;
      props.onCreate(title, body); // 가져온 title과 body를 컴퍼넌트의 사용자에게 props로 공급받아 onCreate함수 호출!!
      // 이후에 topics에 새로운 원소를 추가해서 화면에 구현해야겠지? -> onCreate함수로 새로운 원소 추가하는 코드 만들기~
    }}> 
      <p><input type='text' name='title' placeholder='title' /></p>
      <p><textarea name='body' placeholder='body'></textarea></p>
      <p><input type='submit' value='Create'/></p>
    </form>
  </article>
}

// 5 Update
function Update(props) { // 전반적으로 Create와 같아서 복붙함
  // React에서 onChange는 값을 바꿀때 마다 event 호출
  // props에서 state로 바꾸고, state를 title의 value 값으로 주고 키워드를 입력할때마다 setTitle의 값으로 지정,
  // 그때마다 title의 값이 바뀌고 다시 렌더링되고 무한반복~
  const [title, setTitle] = useState(props.title); //Update(props)로 들어온 props.title 이라는 props값을 state로 변경하는것!
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event => {
      event.preventDefault(); // 페이지 리로드 방지
      const title = event.target.title.value; 
      const body = event.target.body.value;
      props.onUpdate(title, body); //Update 버튼을 누르면! onUpdate로 title과 body값을 전달함(onUpdate 함수에 전달값 얹어서 보내는거임)
    }}>
      <p><input type='text' name='title' placeholder='title' value={title} onChange={event => {
        setTitle(event.target.value); //state로 바꿔도 연결되어 있는 state title값은 바뀌질 않으니,
        // onChange를 통해 키워드를 한자한자 입력할때마다 setTitle(title을 설정)을 통해 title 값으로 렌더링(갱신) <존나중요>
      }}/></p> 
      <p><textarea name='body' placeholder='body' value={body} onChange={event => {
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type='submit' value='Update' /></p>
    </form>
  </article>
} // prop을 state로 환승하는것(props->state 변경) / props는 외부자가 내부자로 보내는 데이터 / state는 내부자가 사용하는 데이터

function AppEgoing() {
  // 1.const _mode = useState('WELCOME'); // useState를 통해서 '상태'를 만드는것! => return값을 _mode로 저장
  // useState는 배열값을 리턴함
  // 2.const mode = _mode[0]; // 0번째 데이터는 상태 데이터를 읽을때 사용
  // 3.const setMode = _mode[1]; // 1번째는 그 상태의 값을 변경할때 사용하는 함수
  const [mode, setMode] = useState('WELCOME'); // 위의 세개(1,2,3)를 합친것을 한줄로 표현
  const [id, setId] = useState(null); // 바뀐 내용을 표시하기 위한 상수
  const [nextId, setNextId] = useState(4); // Id 값을 따로 관리하기 위해 만든 상수 => 새로운 topic 추가를 위해 /초기값4
  const [topics, setTopics] = useState([  // useState로 승격 시켜서 변화 할 수 있게 만듬
    { id: 1, title: 'Html', body: 'Html is ...' },
    { id: 2, title: 'CSS', body: 'CSS is ...' },
    { id: 3, title: 'JS', body: 'JS is ...' }
  ])
  let content = null;
  let contextControl = null;

  // 1. WELCOME 모드
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  }
    // 2. READ 모드
    else if (mode === 'READ') {// mode가 READ일때만 update 버튼 추가하기 + update의 고유한 id값을 주소에 추가하기(클릭해봣자 url에 변화는 없지만 형식적인것임)
    let title, body = null;
    for (let i = 0; i < topics.length; i++){
      if (topics[i].id === id) { // 해당 토픽의 고유 식별자인 id값이 같다면 해당 title과 body를 들고온다.
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article> 
    contextControl = <>
      <li><a href={'/update/' + id} onClick={event => {
      event.preventDefault();
      setMode('UPDATE'); // onClick으로 인해 update버튼을 누르면 setMode를 통해 UPDATE 모드일때 어떻게 할지로 이동시킴!!
      }}>Update</a></li>
      
      <li><input type='button' value='Delete' onClick={() => {
        const newTopics = []; //delete를 추가하기 위해 빈 배열을 만듬
        for (let i = 0; i < topics.length; i++)
          if (topics[i].id !== id) {
            newTopics.push(topics[i]);
          }
        setTopics(newTopics); 
        setMode('WELCOME')
      }}></input></li></>
    }
    
    // 3. CREATE 모드
    else if (mode === 'CREATE') { // 새로운 모드 추가(Create로 li태그 더하기) + 화면에 표시하기 위해서 content 내용을 변경해줘야함
    content = <Create onCreate={(_title, _body) => { // 사용자가 Create 버튼을 눌렀을때 이 함수를 실행합니다! 라고 알려주는것 onCreate를 어떻게 호출할 것인가? 위에 onSubmit을 이용한 form타겟으로 해결
      // 새로운 원소 추가하는 과정 여기서 _title과 _body는 위의 Create 컴포넌트 내에 text input과 textarea에 적힌 것들을 받아오는것
      const newTopic = { id: nextId, title: _title, body: _body } // title= property,_title= param/ id 새로 만들기 위해서 위의 id를 별도로 관리하기 위해 상수를 만듬

      // REACT는 오리지널 value와 setvalue의 값이 같은 데이터라면 굳이 렌더링(값을 반영)하지 않음
      const newTopics = [...topics] // <[...topic]의 의미 = 기존의 topics를 복제 
      // 따라서 오리지널 데이터([1])를 복제([1])해서 복제([1])값을 변경(2로)하고 
      newTopics.push(newTopic); // 여기서 오리지널 데이터를 푸쉬하는 이유는 뭐지? -> 오리지널 데이터가 아니라 기존의 topics를 복제한 newTopics에다가! 새로추기한 newTopic을 넣는다는 뜻임.
      setTopics(newTopics); // newTopic을 넣어 변경한 복제 데이터(newTopics)를 set한다!
      setMode('READ'); // 만들어진 title과 body값을 보기위해 모드를 변경함
      setId(nextId); // 새로 만들 Id값을 topics 내의 id 값으로 set함
      setNextId(nextId + 1); // 다음 nextId는 5가 되면서 새로 Create를 하면 해당 Id는 5임.
    }}></Create>
  } 
    // 4. UPDATE 모드
    // 기존의 내용을 업데이트 -> 기존 title,body를 기본값으로 들고있어야함 -> READ 모드에서 읽어오는것을 불러옴.
    else if (mode === 'UPDATE') {
      //READ에서 가져온 title과 body값 불러오는 코드
      let title, body = null;
      for (let i = 0; i < topics.length; i++){
        if (topics[i].id === id) {
          title = topics[i].title;
          body = topics[i].body;
        }
      }
      
    content = <Update title={title} body={body} onUpdate={(title, body) => { // 기존의 내용을 업데이트 -> 기존 title,body를 기본값으로 들고있어야함
      const newTopics = [...topics] // 복제시작
      const updatedTopic = {id: id, title: title, body: body } // Update는 Read를 한 상태에서만 가능해서 자연스럽게 id값이 세팅 되어 있기때문에 id값이 같음
      for (let i = 0; i < newTopics.length; i++){
        if (newTopics[i].id === id) { // newTopics(복제된 topics임)의 고유 식별자인 id값이 현재 updatedTopic의 id 값과 같다면 
          newTopics[i] = updatedTopic; // 그새끼 찾아서 새로 업데이트 한걸로 바까버리는게 업데이트다 이말임
          break; // 바꾼 새끼 찾았으니까 break로 꺼지고
        }
      }
      setTopics(newTopics);
      setMode('READ'); // 상세보기 페이지로 이동함
    }}></Update>
    }
  return ( // topics를 중괄호로 감쌋기 때문에 문자열이 아닌 상수 topics가 들어감.
    
    <div> 
      <Header title="REACT" onChangeMode={()=> {
        setMode('WELCOME'); 
      }}></Header>

      <Navigation topics={topics} onChangeMode={(_id) => {
        setMode('READ');// setMode로 인해 mode의 값이 READ으로 바뀌고 App 컴포넌트가 재실행됨 -> 실행후 useState가 상수 mode값을 READ로 바꿈
        setId(_id)
      }}></Navigation> 
      
      {content}

      <ul>
        <li>
          <a href='/create' onClick={event=>{
            event.preventDefault();
            setMode('CREATE');
          }}>Create</a>
        </li>
        
        {contextControl}
      </ul>
    </div>
    );
}

export default AppEgoing;
