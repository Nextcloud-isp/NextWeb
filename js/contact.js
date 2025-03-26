// 套餐价格配置
const pricingConfig = {
    personal: {
        '300Mbps': {
            monthly: 170,
            quarterly: 153,
            annually: 136
        },
        '500Mbps': {
            monthly: 220,
            quarterly: 198,
            annually: 176
        },
        '800Mbps': {
            monthly: 270,
            quarterly: 243,
            annually: 216
        }
    },
    shared: {
        '300Mbps': {
            monthly: 70,
            quarterly: 63,
            annually: 56
        },
        '500Mbps': {
            monthly: 80,
            quarterly: 72,
            annually: 64
        },
        '800Mbps': {
            monthly: 90,
            quarterly: 81,
            annually: 72
        }
    },
    professional: {
        '1Gbps': {
            monthly: 450,
            quarterly: 405,
            annually: 360
        },
        '2Gbps': {
            monthly: 800,
            quarterly: 720,
            annually: 640
        },
        '5Gbps': {
            monthly: 1800,
            quarterly: 1620,
            annually: 1440
        }
    }
};

// 获取URL参数
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    
    // 获取周期相关信息
    const periodType = params.get('period') || 'monthly';
    const periodText = getPeriodText(periodType);
    
    // 获取价格并根据周期计算总价
    let price = params.get('price') || '0';
    
    // 转换为数字进行计算
    price = Number(price);
    
    // 根据周期计算总价
    if (periodType === 'quarterly') {
        price = price * 3; // 季度总价 = 月价 × 3
    } else if (periodType === 'annually') {
        price = price * 12; // 年度总价 = 月价 × 12
    }
    
    return {
        planType: params.get('plan') || 'personal',
        bandwidth: params.get('bandwidth') || '300Mbps',
        period: periodText,
        price: price
    };
}

// 获取周期显示文本
function getPeriodText(period) {
    const periodMap = {
        monthly: '月付',
        quarterly: '季付',
        annually: '年付'
    };
    return periodMap[period] || '月付';
}

// 获取套餐类型显示文本
function getPlanTypeText(planType) {
    const planMap = {
        personal: '个人套餐',
        shared: '共享套餐',
        professional: '专业套餐'
    };
    return planMap[planType] || '个人套餐';
}

// 计算价格
function calculatePrice(params) {
    const { planType, bandwidth, period } = params;
    try {
        return pricingConfig[planType][bandwidth][period];
    } catch (e) {
        console.error('价格计算错误:', e);
        return 0;
    }
}

// 更新订单信息
function updateOrderInfo() {
    const params = getUrlParams();
    
    document.getElementById('planType').textContent = getPlanTypeText(params.planType);
    document.getElementById('bandwidth').textContent = params.bandwidth;
    document.getElementById('period').textContent = params.period;
    document.getElementById('price').textContent = `¥${params.price}`;
    document.getElementById('total').textContent = `¥${params.price}`;
    document.getElementById('bankAmount').textContent = `¥${params.price}`;
}

// 支付方式切换处理
function switchPaymentMethod() {
    const alipayQR = document.getElementById('alipayQR');
    const wechatQR = document.getElementById('wechatQR');
    const alipayTip = document.getElementById('alipayTip');
    const wechatTip = document.getElementById('wechatTip');
    const bankInfo = document.querySelector('.bank-info');
    
    // 获取选中的支付方式
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    
    // 隐藏所有支付相关元素
    alipayQR.classList.add('hidden');
    wechatQR.classList.add('hidden');
    alipayTip.classList.add('hidden');
    wechatTip.classList.add('hidden');
    bankInfo.classList.add('hidden');
    
    // 根据选择显示对应的支付信息
    switch(selectedPayment) {
        case 'alipay':
            alipayQR.classList.remove('hidden');
            alipayTip.classList.remove('hidden');
            break;
        case 'wechat':
            wechatQR.classList.remove('hidden');
            wechatTip.classList.remove('hidden');
            break;
        case 'bank':
            bankInfo.classList.remove('hidden');
            break;
    }
}

// 添加支付方式切换事件监听
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', switchPaymentMethod);
});

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    updateOrderInfo();
    switchPaymentMethod();
}); 