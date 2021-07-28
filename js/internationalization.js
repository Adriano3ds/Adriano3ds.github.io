let Internationalization = () => {
	siteStrings = {
		'en-us': {
			'hi': 'Hello!',
			'welcome': 'Welcome!',
			'whoami': 'WHO AM I?',
			'myname': 'My name is <u class="font-bolder">Adriano Junior</u>',
			'shortbio1': 'I\'m $idade$ years old and I\'m studying Biomedical Engineering at <i>Universidade Federal de Uberlândia</i>.',
			'shortbio2': 'The desire to be able to innovate and create new things was what made me choose engineering.',
			'shortbio3': 'I\'ve always loved programming.<br><br>I was monitor of the discipline <i>Introdução à Tecnologia da Computação</i> twice, which involved programming in C.', 
			'knowledgein': 'I have knowledge in:',
			'workedwith': 'I already worked with:',
			'projects': 'PROJECTS',
			'clicktolearn': 'Click to learn more',
			'networks': 'PERSONAL NETWORKS',
			'access': 'Access',
			'close': 'Fechar',
			'wasused': 'Was used:',
			'desafioajdesc': 'The <i>Desafio A.J</i> was a website with logic/math challenges that I made while I was still in high school. The website had a registration invitation system, which the administrator needed to generate a code for the specific person to be able to register; Login; and had an administrator panel.',
			'cdeckdesc': 'CDeck is a small C library that allows the creation and usage of cards in C. And it allows you to print both sides of the cards.',
			'biofizzdesc': 'Biofizz is a challenging and fun game of questions and answers, whose subject is systems biophysics, developed by students of Biomedical Engineering, in the discipline of Biophysics of the year 2019-1.<br><br>Build your team, challenge your friends and win this race.<br><br>Guidance: Prof. Ms. Marina Abadia Ramos – <i>Instituto de Ciências Biomédicas, ICBIM, DEBIOF – Departamento de Biofísica, Universidade Federal de Uberlândia</i>. July, 2019.',
		},
		'pt-br': {
			'hi': "Olá!",
			'welcome': 'Seja bem vindo!',
			'whoami': 'QUEM SOU EU?',
			'myname': 'Meu nome é <u class="font-bolder">Adriano Junior</u>',
			'shortbio1': 'Tenho $idade$ anos e sou estudante de Engenharia Biomédica na Universidade Federal de Uberlândia.',
			'shortbio2': 'O desejo de poder inovar e criar coisas novas foi o que me fez escolher a engenharia.',
			'shortbio3': 'Sempre gostei muito de programação.<br><br>Fui duas vezes monitor da disciplina Introdução à Tecnologia da Computação, a qual envolvia programar em C.', 
			'knowledgein': 'Tenho conhecimentos em:',
			'workedwith': 'Já mexi com:',
			'projects': 'PROJETOS',
			'clicktolearn': 'Clique para saber mais',
			'networks': 'MINHAS REDES',
			'access': 'Acessar',
			'close': 'Fechar',
			'wasused': 'Foi utilizado:',
			'desafioajdesc': 'O Desafio A.J foi um site com desafios de lógica/matemática que fiz enquanto ainda estava no ensino médio. O site contava com um sistema de convite de para cadastro, com o qual o administrador deveria gerar um código para a determinada pessoa poder se registrar; login; e um painel de administrador.',
			'cdeckdesc': 'CDeck é uma pequena biblioteca em C que permite a criação e uso de cartas em C. Além disso, ela permite imprimir a frente e o verso das cartas.',
			'biofizzdesc': 'Biofizz é um jogo desafiador e divertido de perguntas e respostas, cujo assunto é biofísica de sistemas, desenvolvido pelos alunos de Engenharia Biomédica, na disciplina de Biofísica do ano 2019-1.<br><br>Monte a sua equipe, desafie seus amigos e ganhe esta corrida.<br><br>Orientação: Prof. Ms. Marina Abadia Ramos – Instituto de Ciências Biomédicas, ICBIM, DEBIOF – Departamento de Biofísica, Universidade Federal de Uberlândia. Julho, 2019.',
		}
	}
	const updateText = (obj, language, stringKey) => {
		return obj.innerHTML = siteStrings[language][$(obj).attr('i18key')];
	}

	return {updateText};
}