function generateEmail() {
  const purpose = document.getElementById('purpose').value.trim();
  const tone = document.getElementById('tone').value;
  const points = document.getElementById('points').value.trim();
  
  if (!purpose) { alert('Please enter what the email is about'); return; }
  
  const templates = {
    professional: `Subject: Following Up on ${purpose}\n\nDear [Recipient],\n\nI hope this message finds you well. I'm writing to follow up regarding ${purpose}.\n\n${points ? 'Key points to discuss:\n' + points.split('\n').map(p => '• ' + p).join('\n') : ''}\n\nI'd appreciate the opportunity to discuss this further at your convenience.\n\nBest regards,\n[Your Name]`,
    friendly: `Subject: Quick note about ${purpose}! 👋\n\nHi [Name],\nHope you're having a great week! I wanted to reach out about ${purpose}. ${points ? 'Here are a few things:\n' + points.split('\n').join('\n') : ''}\nWould you be up for a quick call this week?\n\nCheers,\n[Your Name]`,
    formal: `Subject: Regarding ${purpose}\n\nDear [Recipient],\nI am writing to formally address the matter of ${purpose}. ${points ? 'The following points warrant discussion:\n' + points.split('\n').map(p => '• ' + p).join('\n') : ''}\nI would be grateful for the opportunity to discuss this at your earliest convenience.\n\nRespectfully,\n[Your Name]`,
    casual: `Subject: Hey - ${purpose} 🤙\n\nHey [Name],\nWhat's up? Just wanted to touch base about ${purpose}. ${points ? 'Things on my mind:\n' + points.split('\n').join('\n') : ''}\nLet me know when you're free to chat!\n\nTalk soon,\n[Your Name]`
  };
  
  document.getElementById('emailOutput').textContent = templates[tone] || templates.professional;
  document.getElementById('result').style.display = 'block';
}
