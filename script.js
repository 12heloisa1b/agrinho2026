// Valores iniciais de equilíbrio
let productivity = 50;
let environment = 50;
let currentQuestionIndex = 0;

// Lista de situações (você pode adicionar mais e pesquisar dados reais!)
const questions = [
    {
        text: "É hora de preparar o solo para o plantio da soja. O que você faz?",
        options: [
            { 
                text: "Uso o Sistema de Plantio Direto (inovação e conservação).", 
                prod: 10, env: 20, 
                feedback: "Ótima escolha! O plantio direto evita a erosão, retém água no solo e mantém a produtividade."
            },
            { 
                text: "Faço a aração convencional em todo o terreno.", 
                prod: 10, env: -20, 
                feedback: "Atenção: Embora produza, revolver muito o solo causa erosão e perda de nutrientes (desequilíbrio)."
            }
        ]
    },
    {
        text: "Surgiram pragas na lavoura. Como você resolve?",
        options: [
            { 
                text: "Aplico defensivos químicos em toda a área preventivamente.", 
                prod: 15, env: -25, 
                feedback: "Alerta ambiental! O uso excessivo de produtos químicos pode contaminar a água e matar insetos benéficos."
            },
            { 
                text: "Uso drones para identificar focos e aplico controle biológico.", 
                prod: 10, env: 15, 
                feedback: "Inovação! Drones e controle biológico combatem a praga de forma precisa e sustentável."
            }
        ]
    }
];

function updateScores() {
    document.getElementById('prod-score').innerText = productivity;
    document.getElementById('env-score').innerText = environment;
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        finishGame();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = currentQuestion.text;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ""; // Limpa opções anteriores
    document.getElementById('feedback-text').innerText = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'btn-option';
        button.innerText = option.text;
        button.onclick = () => selectOption(option);
        optionsContainer.appendChild(button);
    });
}

function selectOption(option) {
    productivity += option.prod;
    environment += option.env;
    
    // Trava os valores entre 0 e 100
    productivity = Math.max(0, Math.min(100, productivity));
    environment = Math.max(0, Math.min(100, environment));
    
    updateScores();
    
    document.getElementById('feedback-text').innerText = option.feedback;
    
    // Desabilita botões temporariamente
    const buttons = document.querySelectorAll('.btn-option');
    buttons.forEach(btn => btn.disabled = true);

    // Espera 3 segundos para ler o feedback e passa para a próxima
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 3500);
}

function finishGame() {
    document.getElementById('question-text').innerText = "Fim da Simulação!";
    document.getElementById('options-container').innerHTML = "";
    
    let finalMessage = "";
    if (productivity > 60 && environment > 60) {
        finalMessage = "Parabéns! Você alcançou o verdadeiro EQUILÍBRIO. Um agro forte e um futuro sustentável!";
    } else if (productivity > environment) {
        finalMessage = "Você produziu muito, mas o meio ambiente sofreu. Tente aplicar mais inovações sustentáveis da próxima vez.";
    } else {
        finalMessage = "Você protegeu o meio ambiente, mas a produtividade caiu. Lembre-se: tecnologia ajuda a manter os dois altos!";
    }
    
    document.getElementById('feedback-text').innerHTML = `<strong>${finalMessage}</strong>`;
}

// Inicia o simulador
updateScores();
loadQuestion();