import { URL_CONSULTATION_GET } from "constants/index";
import React, { useEffect, useState } from "react";
import moment from 'moment'
import { useHistory } from "react-router-dom";
import { getConsultations, getUserPrograms } from "../utils/ApiUtils";

function AvaTabs({ data, tabChnageHandler }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '25px'
      }}>
      {
        data.map((datum, index) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
            key={index}
            onClick={() => {
              tabChnageHandler.settabState(datum)
            }}
          >
            <span
              style={{
                display: 'inline-block',
                fontSize: '14px',
                fontWeight: tabChnageHandler.tabState === datum ? '800' : '500',
                color: tabChnageHandler.tabState === datum ? '#dd66a6' : '#222222',
                borderBottom: tabChnageHandler.tabState === datum ? '1px solid #dd66a6' : ''
              }}>{datum}</span>
          </div>
        ))
      }
    </div>
  )
}

function AvaPatientInfoCard({ info }) {
  console.log('info', info);
  const history = useHistory();
  const [slotTime, setslotTime] = useState([]);
  const [slotId, setslotId] = useState('');

  useEffect(() => {
    getConsultations(info.id).then((res) => {
      if (res.data.length > 0) {
        setslotId(res.data[0].id);
        setslotTime([res.data[0].slot_start, res.data[0].slot_end]);
      }
    }, (err) => {
      console.log('Err: ', err);
    }).catch(err => {
      console.log('Catch Err: ', err);
    })
  }, [info])

  return (
    <div style={{ borderRadius: '4px', display: 'flex', flexDirection: 'column', backgroundColor: '#FFF', margin: '15px', padding: '12px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
      <div style={{ display: 'flex', flexDirection: 'row', }}>
        <div style={{ display: 'flex', flexDirection: 'column', }}>
          <img
            height='60'
            width='60'
            style={{ borderRadius: '30px' }}
            src={info.customer.user.image_url}
            alt={info.customer.name} />
          {
            slotTime.length > 0 &&
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              color: '#4f4f4f',
              borderRadius: '5px',
              padding: '5px'
            }}>
              <div>{moment(slotTime[0]).format('LT')}-{moment(slotTime[1]).format('LT')}</div>
              <div>{moment(slotTime[0]).format('ll')}</div>
            </div>}
        </div>
        <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
              {info.customer.name}
            </div>
            <div>
              <span>id : </span><span style={{ fontSize: '14px', fontWeight: 'bold' }}>{info.id}</span>
            </div>
          </div>

          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
            {info.plan.program.name}
          </div>
          <div>
            <span>Valid till : </span><span style={{ fontSize: '14px', fontWeight: 'bold' }}>
              {moment(info.valid_till).format('ll')}
            </span>
          </div>
          {slotTime.length > 0 &&
            <div style={{ display: 'flex', flexDirection: 'row-reverse', paddingTop: '15px' }}>
              <div
                style={{ color: '#dd66a6', fontSize: '14px', fontWeight: 'bold' }}
                onClick={() => {
                  if (slotId) {
                    history.push(URL_CONSULTATION_GET(slotId))
                  } else {
                    alert('No Slot Found.');
                  }
                }}
              >
                Start Consultation
        </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default function UserProgramList() {
  const [tabState, settabState] = useState('Active');
  const [patientsData, setpatientsData] = useState([])

  useEffect(() => {
    getUserPrograms().then((res) => {
      let data = res.data;
      let promiseArr = [];
      data.forEach(element => {
        promiseArr.push(getConsultations(element.id));
      });
      Promise.all(promiseArr).then(sucRes => {
        let element;
        for (let index = 0; index < data.length; index++) {
          element = data[index];
          if (sucRes[index].data.length > 0) {
            element.slotId = sucRes[index].data[0].id;
            element.slotTime = [sucRes[index].data[0].slot_start, sucRes[index].data[0].slot_end];
          } else {
            element.slotId = null;
            element.slotTime = [];
          }
        }
        setpatientsData(data);
      }, errRes => {
        console.log('errRes', errRes);
      }).catch(err => {
        console.log('err', err);
      })
    }, (err) => {
      console.log('Err: ', err);
    }).catch(err => {
      console.log('Catch Err: ', err);
    })
  }, []);

  return (
    <div>
      <div>
        <AvaTabs
          data={['Active', 'Upcoming', 'History']}
          tabChnageHandler={{ tabState, settabState }}
        />
        <div>
          {
            patientsData.map((datum, index) => (
              <AvaPatientInfoCard key={index} info={datum} />
            ))
          }
        </div>
      </div>
    </div>
  );
}
