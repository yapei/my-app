import { useEffect, useState } from 'react';

const App = () => {
  const [zVerificationData, setZVerificationData] = useState([]);
  const [zCherrypickData, setZCherrypickData] = useState([]);
  // fetch API中的GET,默认执行GET
/*   useEffect(() =>{
    fetch('http://localhost:3000/zverification')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setZVerificationData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  },[]) */
  const zstreamList = async() => {
    const response = await
    fetch('http://localhost:3000/zverification');
    const data = await response.json();
    console.log(data);
    setZVerificationData(data);
  };

  const zcherrypickList = async() => {
    const response = await
    fetch('http://localhost:3000/zcherrypick');
    const data = await response.json();
    console.log(data);
    setZCherrypickData(data);
  };

  return (
    <div className='pages-container'>
      <button className='zverification-btn' onClick={zstreamList}>Get z-stream PRs waiting verification</button>
      <table className='zverification-table'>
        <thead className='zverification-table-head'>
          <th>PR_URL</th>
          <th>PR_Title</th>
          <th>PR_Last_Update</th>
          <th>PR_Components</th>
          <th>PR_QA_Contact</th>
        </thead>
        {zVerificationData.map(item => (
          <tbody className='zverification-table-body'>
            <tr>
              <td id='pr_url'>{item.pull_request_URL}</td>
              <td id='pr_title'>{item.pull_request_title}</td>
              <td id='pr_last_update'>{item.pull_request_last_update}</td>
              <td id='pr_components'>{item.pull_result_bz_component}</td>
              <td id='pr_qa_contact'>{item.pull_result_bz_qa_contact}</td>
            </tr>
          </tbody>
        ))}
      </table>
      <button className='zcherrypick-btn' onClick={zcherrypickList}>Get z-stream waiting for cherry pick approval</button>
      <table className='zcherrypick-table'>
        <thead className='zcherrypick-table-head'>
          <th>PR_URL</th>
          <th>PR_Title</th>
          <th>PR_Last_Update</th>
          <th>PR_Components</th>
          <th>PR_QA_Contact</th>
        </thead>
        {zCherrypickData.length == 0
        ? <tbody>
          No PRs pending on cherry pick approval
        </tbody>
        :zCherrypickData.map(item => (
          <tbody className='zcherrypick-table-body'>
            <tr>
              <td id='pr_url'>{item.pull_request_URL}</td>
              <td id='pr_title'>{item.pull_request_title}</td>
              <td id='pr_last_update'>{item.pull_request_last_update}</td>
              <td id='pr_components'>{item.pull_result_bz_component}</td>
              <td id='pr_qa_contact'>{item.pull_result_bz_qa_contact}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default App;