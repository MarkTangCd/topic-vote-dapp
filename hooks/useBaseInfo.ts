import { useState, useEffect } from 'react';
import { useContract, useProvider, useAccount } from 'wagmi';
import topicVoteABI from '../abis/TopicVote.json';
import { TopicVoteAddress } from '../config/contracts';

const useBaseInfo = () => {
  const [isOwner, setIsOwner] = useState(false);
  const [topic, setTopic] = useState('');
  const [total, setTotal] = useState(0);
  const [expiredTime, setExpiredTime] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const provider = useProvider();
  const { address, isConnected } = useAccount();
  const contract = useContract({
    addressOrName: TopicVoteAddress,
    contractInterface: topicVoteABI.abi,
    signerOrProvider: provider
  });

  useEffect(() => {
    // provider is ready
    if (provider) {
      (async() => {
        const _topic = await contract.topic();
        const _total = await contract.total();
        const _owner = await contract.owner();
        const _expiredTime = await contract.expiredTime();
        const _end = await contract.end();
        setTopic(_topic);
        setTotal(_total);
        setIsOwner(isConnected ? address === _owner : false);
        setExpiredTime(_expiredTime);
        setIsEnd(_end);
      })
    }
  }, [provider, isConnected]);

  return { isOwner, topic, total, expiredTime, isEnd }
}

export default useBaseInfo;