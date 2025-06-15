
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SimpleCaptchaProps {
  onValidationChange: (isValid: boolean) => void;
  reset?: boolean;
}

const SimpleCaptcha: React.FC<SimpleCaptchaProps> = ({ onValidationChange, reset }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isValid, setIsValid] = useState(false);

  const generateNewCaptcha = () => {
    const newNum1 = Math.floor(Math.random() * 10) + 1;
    const newNum2 = Math.floor(Math.random() * 10) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
    setUserAnswer('');
    setIsValid(false);
  };

  useEffect(() => {
    generateNewCaptcha();
  }, [reset]);

  useEffect(() => {
    const correctAnswer = num1 + num2;
    const userNumAnswer = parseInt(userAnswer);
    const valid = !isNaN(userNumAnswer) && userNumAnswer === correctAnswer;
    setIsValid(valid);
    onValidationChange(valid);
  }, [userAnswer, num1, num2, onValidationChange]);

  return (
    <div className="space-y-2">
      <Label htmlFor="captcha">Security Check</Label>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          What is {num1} + {num2}?
        </span>
        <Input
          id="captcha"
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Answer"
          className="w-20"
        />
        {isValid && <span className="text-green-600 text-sm">✓</span>}
      </div>
    </div>
  );
};

export default SimpleCaptcha;
