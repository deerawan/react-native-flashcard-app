export function getScoreFeedback(percentage: number) {
  if (percentage === 100) {
    return 'Perfect score! You are super genius';
  }

  if (percentage >= 90 && percentage < 100) {
    return 'Awesome! You almost got perfect score';
  }

  if (percentage >= 60 && percentage < 90) {
    return 'Good score, keep trying!';
  }

  if (percentage > 0 && percentage < 60) {
    return 'Turn off your TV and study more';
  }

  if (percentage === 0) {
    return 'Are you kidding me?';
  }
}
