const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
  'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const $dayPosition = document.getElementById('date-day');
const $monthPosition = document.getElementById('date-month');
const date = new Date();
$dayPosition.innerHTML = `${days[date.getDay()]}`;
$monthPosition.innerHTML = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

