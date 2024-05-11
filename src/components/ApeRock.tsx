import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Flex } from 'antd';
import { MyTable } from "@/components/MyTable";
import { BaseLink } from "../components/base/BaseLink";
import { FormInstance } from 'antd/lib/form';
import StarsCanvas from '@/canvas/mars_cover';

const { Option } = Select;

interface FormValues {
  participant: string;
  paymentType: string;
  amount: string;
}


export const ApeRock: React.FC<{id: number}> = ({id} : {id: number}) => {
  console.log(id)
  const participantData = [
    { id: 1, Name: 'Zinzu Chan Lee', Country: 'https://hatscripts.github.io/circle-flags/flags/in.svg', Age: '27', Odds: '18/4', OddsVal: '10' },
    { id: 2, Name: 'Jeet Saru', Country: 'https://hatscripts.github.io/circle-flags/flags/in.svg', Age: '32', Odds: '10/2', OddsVal: '5' },
    { id: 3, Name: 'Sonal Gharti', Country: 'https://hatscripts.github.io/circle-flags/flags/in.svg', Age: '24', Odds: '10/5', OddsVal: '2' },
  ];

  const [form] = Form.useForm<FormInstance<FormValues>>();
  const [participant, setParticipant] = useState<string>('');
  const [paymentType, setPaymentType] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [payOut, setPayOut] = useState<number>(0);

  const handleSubmit = (values: FormValues) => {

  };

  useEffect(() => {
    if (amount > 0 && !!participant) {
      const partipantOdd = participantData.find(item => item.Name === participant)?.OddsVal;
      setPayOut(amount * (Number(partipantOdd) + 1));
    }
  }, [amount, participant])

  return (
    <div className='w-full h-screen absolute inset-0 z-[-1]  mx-0 overflow-y-auto'>
      <div className="w-full h-full fixed inset-0 z-[-1]">
        <StarsCanvas />
      </div>
      <div className='p-32'>
        <BaseLink className="mb-10" to="/">Back</BaseLink>
        <Flex justify="space-between" className='mt-[5%]'>
          <div className="w-full md:w-1/2 p-2 flex justify-center">
            <div>
              {id == 0  &&  <img className="w-600" src="/images/arch.png" /> }
              {id == 1  &&  <img className="w-600" src="/images/football.png" /> }
              {id == 2  &&  <img className="w-600" src="/images/shooter.png" /> }
             
            </div>
          </div>


          <div className="w-full md:w-1/2 p-2">
            <div className=" bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50 p-12 rounded-lg shadow-xxl" style={{ maxWidth: '500px' }}>
              <h2 className="text-8xl text-center  mb-8 text-white" style={{ fontSize: '1.5rem', fontWeight: '500' }}>Place Your Bet</h2>
              <Form className="form-white-labels"
                onFinish={handleSubmit}
                layout="vertical"
                initialValues={{
                  participant: participant,
                  paymentType: paymentType,
                  amount: amount
                }}
              >
                <Form.Item
                  name="participant"
                  label="Select Participant"
                  style={{ color: 'white' }}
                  className="text-white"
                  rules={[{ required: true, message: 'Please select a participant!' }]}
                >
                  <Select
                    placeholder="Select a participant"
                    onChange={value => setParticipant(value)}
                    className="bg-white/10 text-white  rounded-md border-none"
                  >
                    {participantData.map((item) => (
                      <Option key={item.id} value={item.Name}>
                        {item.Name}
                      </Option>
                    )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="paymentType"
                  label="Crypto Payment"
                  className="text-white"
                  rules={[{ required: true, message: 'Please select a payment type!' }]}
                >
                  <Select
                    placeholder="Select payment type"
                    onChange={value => setPaymentType(value)}
                    className="bg-white/10 text-white rounded-md border-none"
                  >
                    <Option value="bitcoin">Bitcoin</Option>
                    <Option value="ethereum">Ethereum</Option>
                    <Option value="litecoin">Litecoin</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="amount"
                  label="Enter Amount"
                  className="text-white "
                  rules={[{ required: true, message: 'Please enter an amount!', pattern: /^\d+(\.\d{1,2})?$/ }]}
                >
                  <Input
                    type="text"
                    placeholder="Amount in USD"
                    className="bg-white text-black rounded-md"
                  />
                </Form.Item>

                {payOut > 0 && (<p className=" bg-gray-800 p-2 rounded-md  mb-[2rem]">
                  Expected Pay Out: <span className="font-bold text-green-400">${payOut.toFixed(2)}</span>
                </p>)}

                <Form.Item>
                  <Button htmlType="submit" className="w-full text-white bg-purple-600 hover:border-transparent hover:text-white hover:bg-purple-800 transition-colors duration-300 rounded-md">
                    Place Bet
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Flex>

        <div className='mt-[2rem] container'>
          <MyTable />
        </div>
      </div>

    </div>
  );
}