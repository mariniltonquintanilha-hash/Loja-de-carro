function showPage(pageId) {
    // 1. Esconder todas as seções
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    // 2. Mostrar a seção desejada
    const activeSection = document.getElementById(pageId);
    if (activeSection) {
        activeSection.classList.remove('hidden');
        // Scroll para o topo suavemente
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 3. Atualizar o link ativo no menu
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Verifica se o onclick desse link aponta para a pagina atual
        if (link.getAttribute('onclick').includes(pageId)) {
            link.classList.add('active');
        }
    });

    // 4. Fechar menu mobile se estiver aberto
    const navbar = document.getElementById('navbar');
    navbar.classList.remove('mobile-active');
}

function toggleMobileMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('mobile-active');
}

// Função para calcular financiamento
function calculateFinancing() {
    const vehicleValue = parseFloat(document.getElementById('vehicleValue').value) || 150000;
    const downPayment = parseFloat(document.getElementById('downPayment').value) || 30000;
    const term = parseInt(document.getElementById('term').value) || 48;
    const monthlyRate = 0.0099; // 0,99% ao mês
    
    // Valor financiado
    const financedAmount = vehicleValue - downPayment;
    
    // Cálculo da parcela (sistema price)
    const monthlyPayment = financedAmount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    
    // Atualizar valores na tela
    document.getElementById('financedAmount').textContent = `R$ ${financedAmount.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('monthlyPayment').textContent = `R$ ${monthlyPayment.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

// Inicializar na Home
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
    
    // Configurar eventos para o simulador
    document.getElementById('vehicleValue').addEventListener('input', calculateFinancing);
    document.getElementById('downPayment').addEventListener('input', calculateFinancing);
    document.getElementById('term').addEventListener('change', calculateFinancing);
    
    // Calcular financiamento inicial
    calculateFinancing();
});
