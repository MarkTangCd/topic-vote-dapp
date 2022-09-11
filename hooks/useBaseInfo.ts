import { useState, useEffect, useCallback } from 'react';
import { useContract, useProvider, useAccount } from 'wagmi';
import TopicVoteABI from '../abis/TopicVote.json';
import { TopicVoteAddress } from '../config/contracts';

const useBaseInfo = () => {
  const [isOwner, setIsOwner] = useState(false);
  const [topic, setTopic] = useState('');
  const [total, setTotal] = useState(0);
  const [expiredTime, setExpiredTime] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(true);
  const provider = useProvider();
  const { address, isConnected } = useAccount();
  const contract = useContract({
    addressOrName: TopicVoteAddress,
    contractInterface: TopicVoteABI.abi,
    signerOrProvider: provider
  });

  const getBaseInfo = useCallback(async() => {
    const _topic = await contract.topic();
    const _total = await contract.total();
    const _owner = await contract.owner();
    const _expiredTime = await contract.expiredTime();
    const _end = await contract.end();
    setTopic(_topic);
    setTotal(_total.toNumber());
    setIsOwner(isConnected ? address === _owner : false);
    setExpiredTime(_expiredTime.toNumber());
    setIsEnd(_end);
    setLoading(false);
  }, [contract, isConnected]);

  useEffect(() => {
    // provider is ready
    if (provider) {
       getBaseInfo();
    }
  }, [provider, isConnected]);

  return { isOwner, topic, total, expiredTime, isEnd, loading }
}

export default useBaseInfo;