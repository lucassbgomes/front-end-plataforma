import styled from 'styled-components';

export const Container = styled.div`
  > header {
    height: 39.1px;
    background: #ffffff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.26);

    display: flex;
    align-items: center;
    justify-content: center;
  }

  > form {
    padding: 0px 16px;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  min-height: 398px;
  margin: 0 auto;
  margin-top: 32.9px;

  background-color: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.26);

  > header {
    width: 100%;
    height: 56px;
    background-color: #007968;
    color: #ffffff;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;

    > h3 {
      font-size: 20px;
    }

    > button {
      background-color: transparent;
      border: none;
      color: #ffffff;
      text-transform: uppercase;
      font-size: 14px;
      font-weight: 500;

      display: flex;
      align-items: center;
      justify-content: center;
      padding: 11px 16px;

      &:hover {
        background-color: #00a98e;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.26);
      }
    }
  }

  > div {
    padding: 24px 16px;
  }
`;

export const ErrorMsg = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  font-size: 12px;
  font-weight: 400;
  color: #d32f2f;

  svg {
    width: 16px;
    margin-right: 6px;
  }
`;

export const ItemSelect = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  span.nome {
    font-size: 14px;
    font-weight: 400;
    line-height: 126%;
    color: #333D47;
  }

  span.cnpj {
    font-size: 12px;
    font-weight: 400;
    line-height: 120%;
    color: #9E9E9E;
  }
`;

export const RestoreForm = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 94px;

  display: flex;
  justify-content: center;

  button {
    color: #828D8C;
    display: flex;
    align-items: center;

    border: none;

    svg {
      margin-right: 20px;
      width: 63px; 
      height: 54px;
    }

    > span {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      strong {
        font-size: 18px;
        font-weight: 700px;
        line-height: 21px;
        letter-spacing: 0.65px;
      }

      span {
        font-size: 14px;
        font-weight: 400px;
        line-height: 16px;
        letter-spacing: 0.5px;
        font-style: italic;
      }
    }
  }
`;