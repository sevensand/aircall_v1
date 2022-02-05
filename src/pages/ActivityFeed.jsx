import React, {useEffect, useState} from "react";
import { List, Avatar, Divider, Modal, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

export const ActivityFeed = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [info, setInfoDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const loadMoreData = () => {
   if (loading) {
     return;
   }
   setLoading(true);
   fetch('https://aircall-job.herokuapp.com/activities')
     .then(res => res.json())
     .then(body => {
       const filterCalls = body.filter((item) => item.is_archived === false);
       setData(filterCalls);
       setLoading(false);
     })
     .catch(() => {
       setLoading(false);
     });
 };

  useEffect(() => {
  loadMoreData();
}, []);

const showModal = (id) => {
  setIsModalVisible(true);
  fetch(`https://aircall-job.herokuapp.com/activities/${id}`)
    .then(res => res.json())
    .then(body => {
      setInfoDetails(body);
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    });
};

const handleOk = () => {
  setIsModalVisible(false);
    setInfoDetails([])
};

const handleCancel = () => {
  setIsModalVisible(false);
  setInfoDetails([])
};

const handleArchive = (id) => {
  fetch(`https://aircall-job.herokuapp.com/activities/${id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      is_archived: true
    })

  }).then(res => {
      loadMoreData();
     setIsModalVisible(false);
  }).catch(err => {
      console.log(err)
    });
};

  return (
    <div
     id="scrollableDiv"
     className="infinteScroll"
   >
     <InfiniteScroll
       dataLength={data.length}
       next={loadMoreData}
       hasMore={data.length < 5}
       endMessage={<Divider plain>All Messages 🤐</Divider>}
       scrollableTarget="scrollableDiv"
     >
       <List
         dataSource={data}
         renderItem={item => (
          <a  onClick={e => {
            e.preventDefault();
            showModal(item.id)
          }}>
           <List.Item key={item.id}>
             <List.Item.Meta
               avatar={<Avatar src="/public/avatar.png" />}
               title={item.from}
               description={"Call Duration " + new Date(item.duration * 1000).toISOString().substr(11, 8)}
               avatar={<Avatar src="/public/avatar.png" />}
             />
             {
               item.call_type === "missed" ?
               <Avatar src="/public/missedcall.png" />
               :
               <Avatar src="/public/recieved.png" />
             }
             
             <div>{new Date(item.created_at).toLocaleDateString("en-US")}</div>
           </List.Item>
           </a>
         )}
       />
     </InfiniteScroll>

     <Modal title="Contact Details" visible={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="archive" type="primary" onClick={(e) => {
          e.preventDefault();
          handleArchive(info.id)
        }}>
          Archive
        </Button>,
        <Button key="ok" type="primary" onClick={handleOk}>
          Ok
        </Button>,
      ]}

       width="360px">
     <Avatar src="/public/avatar.png" />
    <p>From: {info.from}</p>
    <p>To:  {info.to}</p>
    <p>Call Via: {info.via}</p>
    <p>Call Type: {info.call_type}</p>
  </Modal>
   </div>

  );
};
