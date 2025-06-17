import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

interface Question {
  id: number;
  title: string;
  description: string;
  code: string;
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
}

interface ProgrammingLanguage {
  id: string;
  name: string;
  extension: string;
}

@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CompilerComponent implements OnInit, OnDestroy {
  questions: Question[] = [
    {
      id: 1,
      title: 'Sum of Two Numbers',
      description: 'Write a function that takes two numbers as input and returns their sum.',
      code: `function sum(a, b) {
  // Write your code here
  
}`,
      testCases: [
        { input: '2, 3', expectedOutput: '5' },
        { input: '-1, 1', expectedOutput: '0' }
      ]
    },
    {
      id: 2,
      title: 'Check Even or Odd',
      description: 'Write a function that checks if a number is even or odd and returns "Even" or "Odd".',
      code: `function checkEvenOdd(num) {
  // Write your code here
  
}`,
      testCases: [
        { input: '4', expectedOutput: 'Even' },
        { input: '7', expectedOutput: 'Odd' }
      ]
    }
  ];

  currentQuestionIndex = 0;
  userCode: string = '';
  output: string = '';
  isSubmitted = false;
  score = 0;
  totalScore = 0;
  private timerSubscription: Subscription | null = null;
  timeRemaining: number = 0.5 * 60; // 15 minutes in seconds
  timerDisplay: string = '00:30';

  programmingLanguages: ProgrammingLanguage[] = [
    { id: 'java', name: 'Java', extension: '.java' },
    { id: 'python', name: 'Python', extension: '.py' },
    { id: 'javascript', name: 'JavaScript', extension: '.js' },
    { id: 'cpp', name: 'C++', extension: '.cpp' },
    { id: 'csharp', name: 'C#', extension: '.cs' }
  ];

  selectedLanguage: string = 'java';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadQuestion();
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
        this.updateTimerDisplay();
      } else {
        this.handleTimeUp();
      }
    });
  }

  private updateTimerDisplay(): void {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    this.timerDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  private handleTimeUp(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    alert('Time is up! Your test will be submitted automatically.');
    this.submitTest();
    this.router.navigate(['/student']);
  }

  get isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

  loadQuestion(): void {
    this.userCode = this.questions[this.currentQuestionIndex].code;
    this.output = '';
    this.isSubmitted = false;
  }

  runCode(): void {
    const question = this.questions[this.currentQuestionIndex];
    let passedTests = 0;

    try {
      // Create a function from the user's code
      const userFunction = new Function('return ' + this.userCode)();

      // Run test cases
      question.testCases.forEach(testCase => {
        const inputs = testCase.input.split(',').map(input => input.trim());
        const result = userFunction(...inputs);
        
        if (String(result) === testCase.expectedOutput) {
          passedTests++;
        }
      });

      this.output = `Tests passed: ${passedTests}/${question.testCases.length}`;
      this.score = (passedTests / question.testCases.length) * 100;
      this.isSubmitted = true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.output = `Error: ${error.message}`;
      } else {
        this.output = 'An unknown error occurred';
      }
    }
  }

  submitTest(): void {
    if (!this.isSubmitted) {
      this.runCode();
      return;
    }

    // Add current question score to total
    this.totalScore += this.score;

    if (this.isLastQuestion) {
      const finalScore = this.totalScore / this.questions.length;
      alert(`Test completed! Your final score is: ${finalScore.toFixed(2)}%`);
      this.router.navigate(['/student']);
    } else {
      // Move to next question
      this.currentQuestionIndex++;
      this.loadQuestion();
    }
  }

  onLanguageChange(language: string): void {
    this.selectedLanguage = language;
    // You can add additional logic here to handle language-specific features
    // For example, changing syntax highlighting, compiler settings, etc.
  }
} 