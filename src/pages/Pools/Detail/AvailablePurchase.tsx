import React, { useState } from 'react'
import styled from 'styled-components'
import { CopyOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getAccount } from '../../../store/wallet'
import { mortgageConfirm } from '../../../apis/pool'
import DepositAPY from '../../../components/EchartsStatistics/DepositAPY'
import neuralNetworks from '../../../assets/images/Pools/neuralNetworksImg.png'
import { useMortgageConfirmModal } from '../../../hooks/modals/useNFTMortgageConfirmModal'
import { useNftDetailQuery } from '../../../hooks/queries/useNftDetailQuery'

const NFTMortgageDetailContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 10rem;
`

const Row = styled.div`
  display: flex;
  justify-content: center;

  .statistics {
    width: 50rem;
    margin-left: 2rem;
    position: relative;

    .ant-statistic-content-value {
      position: absolute;
      right: 10rem;
      color: #fff;
    }
  }
`

const LeftArea = styled.div`
  width: 26.2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 1.3rem;
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22.2rem;
  height: 28.4rem;
  border-radius: 2rem;
  justify-content: center;
  position: relative;
  border: 1px solid #98BDF9;

  img {
    max-height: 34.4rem;
    border-radius: 2rem;
  }
`

const RightArea = styled.div`
  width: 30.9rem;
  margin-left: 1.3rem;
  position: relative;
`

/*const PriceContainer = styled.div`
  .item {
    display: flex;
    flex-direction: row;
    margin-top: 1.2rem;

    .info-label {
      font-size: 1.6rem;
      font-weight: 400;
      color: #A196EF;
      line-height: 2.2rem;
      padding-right: 1.4rem;
    }

    .price {
      font-size: 3.2rem;
      font-weight: 400;
      color: #7C6DEB;
      line-height: 2.5rem;
    }

    .price-in-usd {
      font-size: 1.6rem;
      font-weight: 400;
      color: #A196EF;
      line-height: 2.2rem;
      margin-left: 1rem;
    }
  }
`*/

const NFTBaseInfoContainer = styled.div`
  .nft-name {
    font-size: 4.5rem;
    font-weight: 550;
    color: #98BDF9;
  }

  .description {
    margin-top: 1.2rem;
    height: 12.5rem;
    overflow-y: scroll;
    font-size: 16px;
    font-weight: 400;
    color: #7C6DEB;
    line-height: 22px;
  }

  .info-row {
    margin-top: 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-item {
      display: flex;
      flex-direction: row;
      align-items: center;

      &-label {
        font-size: 1.6rem;
        font-weight: 500;
        color: #98BDF9;
        line-height: 2.2rem;
        padding-right: 1.4rem;
      }

      &-value {
        font-size: 1.6rem;
        font-weight: 500;
        color: #98BDF9;
        line-height: 2.2rem;
        user-select: none;
      }

      .icon-copy {
        margin-left: 0.5rem;
        color: #98BDF9;
        cursor: pointer;
      }


    }
  }

  .info-row-favorite {
    display: flex;
    justify-content: flex-end;
    margin-top: 6rem;

    .info-row-item-value {
      display: flex;
      justify-content: flex-end;
    }

    .icon-favorite {
      width: 2rem;
      height: 1.2rem;
      display: flex;
      align-self: center;
      margin-right: 0.4rem;
    }


  }

  .price-favorite-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    div {
      display: flex;
      color: #98BDF9;
      font-weight: 550;
    }

    .price {
      align-items: flex-end;
      line-height: 2.1rem;

      .price-label {
        font-size: 1.6rem;
        font-weight: bold;
        color: #98BDF9;
        margin-right: 0.8rem;
      }

      .price-value {
        font-size: 1.6rem;
      }
    }

    .info-name {
      display: flex;
      justify-content: flex-end;
      font-size: 1.6rem;
    }

  }
`

const NeuralNetworks = styled.div`
  position: absolute;
  top: 10rem;
  right: 12rem;

  .NeuralNetworksMain {

    .networksValue-name {
      color: #98BAF2;
      font-size: 2rem;
      margin-top: 1rem;
    }

    .networksValue-value {
      color: #fff;
      font-size: 2.4rem;
      font-weight: bolder;
    }
  }
`

const ScheduleMain = styled.div`
  margin-top: 3rem;
`

const ScheduleFirst = styled.div`
  text-align: center;
  width: 80rem;
  margin-left: calc((100% - 80rem) / 2);
  .title {
    color: #F172ED;
    font-size: 2rem;
    font-weight: bolder;
  }

  .main-text {
    font-size: 1.7rem;
    color: #fff;
  }
`

const ConfirmButton = styled(Button)`
  width: 16.9rem;
  height: 4.8rem;
  margin-left: calc((100% - 16.9rem) / 2);
  background: #554BFF;
  border-radius: 1rem;
  border: none;
  color: #fff;
  font-weight: bolder;
  font-size: 1.7rem;
  transition: all 0.7s;
  margin-top: 5rem;

  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`

const EvaluateButton = styled(Button)`
  width: 16.9rem;
  height: 4.8rem;
  margin-left: calc((100% - 16.9rem) / 2);
  background: #554BFF;
  border-radius: 1rem;
  border: none;
  color: #fff;
  font-weight: bolder;
  font-size: 1.7rem;
  transition: all 0.7s;
  margin-top: 5rem;

  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`
const Valuation = styled.div`
  margin-top: 2rem;
  position: relative;
`

const NFTBaseInfo:React.FC<{ data: any }> = ({ data }) => {

  return (
    <NFTBaseInfoContainer>
      <div className="nft-name">
        {data?.name}
      </div>
      <div className="info-row">
        <div className="info-row-item">
          <div className="info-row-item-label">Artist</div>
          <div className="info-row-item-value">
            {data?.addressCreate.substring(0,4)+'...'+data?.addressCreate.slice(-4)}
          </div>
          <CopyOutlined className="icon-copy" />
        </div>
      </div>
    </NFTBaseInfoContainer>
  )
}

type ScheduleAI = {
  data: any
  openMortgageConfirmModal: any
  showAINetwork: () => void
  isAINetwork: boolean
  isConfirm: boolean
  showConfirm: () => void
}

const Schedule:React.FC<ScheduleAI> = ({ data, openMortgageConfirmModal, showAINetwork, isAINetwork, isConfirm, showConfirm }) => {
  const account = useSelector(getAccount)

  const showAIConfirm = () => {
    showAINetwork()
    showConfirm()
  }

  const confirm = () => {
    openMortgageConfirmModal()
    mortgageConfirm({
      uri: data?.valueUri,
      mortgageRate: data?.mortgageRate,
      evaluate: data?.evaluate,
      walletAddress: account
    })
  }

  return (
    <ScheduleMain>
      <EvaluateButton onClick={showAIConfirm}>Evaluate</EvaluateButton>
      {
        isAINetwork ?
          <Valuation>
            <img src={neuralNetworks} alt="" />
            <NeuralNetworks>
              <div className="NeuralNetworksMain">
                <div className="networksValue-name">Evaluation Value</div>
                <div className="networksValue-value">{data?.evaluate} ETH</div>
                <div className="networksValue-name">Mortgage Rate</div>
                <div className="networksValue-value">{data?.mortgageRate * 100}%</div>
              </div>
            </NeuralNetworks>
          </Valuation> :
          <div />
      }
      {
        isConfirm ?
          <div>
            <ScheduleFirst>
              <div className="title">Mortgage overview</div>
              <div className="main-text">
                If you agree with the valuation of the NFT,you can make a
                mortgage,,and the NFT will be locked in the smart contract during
                the mortgage.During the mortgage period,AI Oracle will regularly
                update the valuation of NFT,please pay attention to it regularly.
              </div>
            </ScheduleFirst>
            <ConfirmButton onClick={confirm}>Confirm</ConfirmButton>
          </div> :
          <div />
      }
    </ScheduleMain>
  )
}

const AvailablePurchasePage:React.FC = () => {
  const { uri } = useParams<any>()

  const { data } = useNftDetailQuery({ uri })

  const { mortgageConfirmModal, openMortgageConfirmModal } = useMortgageConfirmModal()

  const [isAINetwork, setAINetwork] = useState<boolean>(false)

  const [isConfirm, setConfirm] = useState<boolean>(false)

  const showAINetwork = () => {
    setAINetwork(true)
  }

  const showConfirm = () => {
    setConfirm(true)
  }

  return (
    <NFTMortgageDetailContainer>
      <Row>
        <LeftArea>
          <ImageContainer>
            <img src={data?.image} alt="" />
          </ImageContainer>
        </LeftArea>
        <RightArea>
          <NFTBaseInfo data={data} />
        </RightArea>
        <div className="statistics">
          <DepositAPY />
        </div>
      </Row>
      <Schedule data={data}
        openMortgageConfirmModal={openMortgageConfirmModal}
        isAINetwork={isAINetwork}
        showAINetwork={showAINetwork}
        isConfirm={isConfirm}
        showConfirm={showConfirm}
      />

      {mortgageConfirmModal}
    </NFTMortgageDetailContainer>
  )
}

export default AvailablePurchasePage
