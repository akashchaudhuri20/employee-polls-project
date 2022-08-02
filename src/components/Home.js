import React from 'react';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import QuestionList from './QuestionList';

function Home({done, newQuestions, auth}) {
  const navigate = useNavigate();

  const data = [
    {
      key: "d1",
      title: "New Questions",
      ids: newQuestions
    },
    {
      key: "d2",
      title: "Done",
      ids: done
    },
  ];

  useEffect(() => {
    !auth && navigate("/login");
  }, [auth, navigate]);

  return (
    <div>
      <div className="home-list">
        {data.map((data) => (
          <div key={data.key}>
            <QuestionList title={data.title} ids={data.ids} />
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = ({ questions, userAuth, users }) => {
  if (userAuth)
    return {
      done: Object.keys(questions)
        .filter((k) => Object.keys(users[userAuth].answers).includes(k))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        newQuestions: Object.keys(questions)
        .filter((k) => !Object.keys(users[userAuth].answers).includes(k))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
      auth: users[userAuth]
    };
  else return {};
};

export default connect(mapStateToProps)(Home);
