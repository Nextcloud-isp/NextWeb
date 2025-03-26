// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      this.innerHTML = nav.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
  }
  
  // 滚动到顶部按钮
  const scrollTopBtn = document.querySelector('.scroll-top');
  
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
      } else {
        scrollTopBtn.classList.remove('active');
      }
    });
    
    scrollTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // 价格选项卡切换
  const tabBtns = document.querySelectorAll('.tab-btn');
  
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        const tabContainer = this.closest('.tab-buttons').parentElement;
        const tabContents = tabContainer.querySelectorAll('.tab-content');
        
        // 移除所有活动状态
        tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        
        tabContents.forEach(content => {
          content.classList.remove('active');
        });
        
        // 添加活动状态
        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
      });
    });
  }
  
  // FAQ 切换
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const answer = this.nextElementSibling;
        const icon = this.querySelector('.toggle-icon i');
        
        // 切换当前FAQ项
        faqItem.classList.toggle('active');
        
        if (faqItem.classList.contains('active')) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          icon.className = 'fas fa-minus';
        } else {
          answer.style.maxHeight = '0';
          icon.className = 'fas fa-plus';
        }
      });
    });
  }
});