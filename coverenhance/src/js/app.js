function enhanceLetter() {
  const letter = document.getElementById('coverLetter').value.trim();
  const targetJob = document.getElementById('targetJob').value.trim();
  
  if (!letter) { alert('Please paste your cover letter'); return; }
  
  const improvements = [];
  
  if (letter.toLowerCase().includes('i think') || letter.toLowerCase().includes('i feel')) {
    improvements.push({ type: 'warn', text: 'Replace "I think/feel" with stronger action verbs' });
  }
  
  if (!letter.includes(targetJob.split(' ')[0].toLowerCase())) {
    improvements.push({ type: 'normal', text: `Mention the target role "${targetJob}" more specifically` });
  }
  
  if (letter.length < 300) {
    improvements.push({ type: 'warn', text: 'Your letter is quite short. Add more specific achievements' });
  }
  
  if (!letter.match(/[0-9]+%/)) {
    improvements.push({ type: 'normal', text: 'Add quantifiable results (%, $, numbers) to stand out' });
  }
  
  if (!letter.toLowerCase().includes('thank')) {
    improvements.push({ type: 'normal', text: 'Include a thank you expression for professionalism' });
  }
  
  if (letter.split('.').length - 1 > 20) {
    improvements.push({ type: 'warn', text: 'Consider breaking into shorter paragraphs for readability' });
  }
  
  improvements.push({ type: 'normal', text: 'Add a specific example of how you solved a relevant problem' });
  improvements.push({ type: 'normal', text: 'Research the company and mention something specific you admire' });
  
  const container = document.getElementById('improvements');
  container.innerHTML = '';
  
  improvements.forEach(imp => {
    const div = document.createElement('div');
    div.className = 'improvement-item';
    div.innerHTML = `<span class="badge ${imp.type}">${imp.type === 'warn' ? '⚠️ IMPROVE' : '💡 TIP'}</span> ${imp.text}`;
    container.appendChild(div);
  });
  
  document.getElementById('result').style.display = 'block';
}
