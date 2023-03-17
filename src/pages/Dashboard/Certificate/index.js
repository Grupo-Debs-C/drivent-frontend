import styled from 'styled-components';
import { useContext } from 'react';
import EventInfoContext from '../../../contexts/EventInfoContext';
import useGetEnrollment from '../../../hooks/api/useGetEnrollment';
import moment from 'moment';
import 'moment/locale/pt-br';
import html2canvas from 'html2canvas';
import { NotRegisteredMessage } from '../../../components/TicketsTypes/NotRegisteredMessage';

export default function Certificate() {
  function generateImage() {
    const element = document.getElementById('certificate');

    html2canvas(element, {
      scale: 1,
      allowTaint: false,
      useCORS: true,
      backgroundColor: null,
      width: element.offsetWidth,
      height: element.offsetHeight,
      logging: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const img = new Image();
      img.src = imgData;
      document.body.appendChild(img);
      const newTab = window.open();
      newTab.document.body.innerHTML = `<img src="${imgData}" />`;
      setTimeout(() => {
        newTab.print();
        newTab.close();
        img.remove();
      }, 500);
    });
  }

  const { eventInfo } = useContext(EventInfoContext);
  const { userEnrollment } = useGetEnrollment();
  moment.locale('pt-br');
  const data = moment(eventInfo.startsAt);

  const dataFormated = data.format('DD [de] MMMM [de] YYYY');
  return (
    <>
      {userEnrollment ? (
        <>
          <Certificated id="certificate">
            <Content>
              <Logo alt="logo" src={eventInfo.logoImageUrl}></Logo>
              <Title>Certificado de participação</Title>
              <Text>Concedemos este certificado a </Text>
              <Title>{userEnrollment ? userEnrollment.name : <></>}</Title>
              <Text>
                Por sua participação no evento {eventInfo.title} no dia {dataFormated}.
              </Text>
            </Content>
          </Certificated>
          <Download onClick={() => generateImage()}>Baixar certificado</Download>
        </>
      ) : (
        <NotRegisteredMessage>
          <p>Você precisa completar sua inscrição para emitir o certificado</p>
        </NotRegisteredMessage>
      )}
    </>
  );
}

const Text = styled.h1`
  margin-top: 20px;
  font-family: 'Lexend Deca', sans-serif;
  font-weight: 450;
`;
const Title = styled.h1`
  font-family: 'Pinyon Script', cursive;
  font-size: 40px;
  font-weight: 550;
  margin-top: 20px;
`;
const Logo = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 20px;
`;
const Certificated = styled.div`
  background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
  width: 850px;
  height: 550px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 35px;
`;

const Content = styled.div`
  flex-direction: column;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
`;
const Download = styled.button`
  margin-top: 15px;
  height: 50px;
  color: black;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-color: #f093fb;
  border-radius: 15px;
  font-weight: 500;
`;
