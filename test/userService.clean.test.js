const { UserService } = require('../src/userService');

describe('UserService - createUser', () => {
  test('deve retornar usuário com id definido ao criar usuário válido', () => {
    // Arrange
    const userService = new UserService();
    userService._clearDB();

    // Act
    const resultado = userService.createUser('Ana', 'ana@email.com', 25);

    // Assert
    expect(resultado.id).toBeDefined();
  });

  test('deve preservar nome, email e status ativo ao criar usuário válido', () => {
    // Arrange
    const userService = new UserService();
    userService._clearDB();

    // Act
    const resultado = userService.createUser('Ana', 'ana@email.com', 25);

    // Assert
    expect(resultado.nome).toBe('Ana');
    expect(resultado.email).toBe('ana@email.com');
    expect(resultado.status).toBe('ativo');
  });

  test('deve lançar erro ao tentar criar usuário menor de idade', () => {
    // Arrange
    const userService = new UserService();
    userService._clearDB();

    // Act & Assert
    expect(() => {
      userService.createUser('Menor', 'menor@email.com', 17);
    }).toThrow('O usuário deve ser maior de idade.');
  });

  test('deve lançar erro ao tentar criar usuário com dados ausentes', () => {
    // Arrange
    const userService = new UserService();
    userService._clearDB();

    // Act & Assert
    expect(() => {
      userService.createUser('', 'email@test.com', 20);
    }).toThrow('Nome, email e idade são obrigatórios.');
  });
});

describe('UserService - getUserById', () => {
  test('deve retornar o usuário correto quando buscado pelo id', () => {
    // Arrange
    const userService = new UserService();
    userService._clearDB();
    const usuarioCriado = userService.createUser('Carlos', 'carlos@email.com', 30);

    // Act
    const resultado = userService.getUserById(usuarioCriado.id);

    // Assert
    expect(resultado.nome).toBe('Carlos');
    expect(resultado.status).toBe('ativo');
  });

  test('deve retornar null quando id não existe', () => {
    // Arrange
    const userService = new UserService();
    userService._clearDB();

    // Act
    const resultado = userService.getUserById('id-inexistente');

    // Assert
    expect(resultado).toBeNull();
  });
});

describe('UserService - deactivateUser', () => {
  test('deve retornar true e marcar status como inativo ao desativar usuário comum', () => {
    // Arrange
    const userService = new UserService();
    userService._clearDB();
    const usuario = userService.createUser('Comum', 'comum@email.com', 30);

    // Act
    const resultado = userService.deactivateUser(usuario.id);

    // Assert
    expect(resultado).toBe(true);
    expect(userService.getUserById(usuario.id).status).toBe('inativo');
  });

  test('deve retornar false e manter admin ativo ao tentar desativar administrador', () => {
    // Arrange
    const userService = new UserService();
    userService._clearDB();
    const admin = userService.createUser('Admin', 'admin@email.com', 40, true);

    // Act
    const resultado = userService.deactivateUser(admin.id);

    // Assert
    expect(resultado).toBe(false);
    expect(userService.getUserById(admin.id).status).toBe('ativo');
  });

  test('deve retornar false ao tentar desativar id inexistente', () => {
    // Arrange
    const userService = new UserService();
    userService._clearDB();

    // Act
    const resultado = userService.deactivateUser('id-inexistente');

    // Assert
    expect(resultado).toBe(false);
  });
});

describe('UserService - generateUserReport', () => {
  test('deve incluir cabeçalho no relatório gerado', () => {
    // Arrange
    const userService = new UserService();
    userService._clearDB();
    userService.createUser('Alice', 'alice@email.com', 28);

    // Act
    const relatorio = userService.generateUserReport();

    // Assert
    expect(relatorio).toContain('Relatório de Usuários');
  });

  test('deve incluir o nome do usuário cadastrado no relatório', () => {
    // Arrange
    const userService = new UserService();
    userService._clearDB();
    userService.createUser('Alice', 'alice@email.com', 28);

    // Act
    const relatorio = userService.generateUserReport();

    // Assert
    expect(relatorio).toContain('Alice');
  });

  test('deve informar ausência de usuários quando banco está vazio', () => {
    // Arrange
    const userService = new UserService();
    userService._clearDB();

    // Act
    const relatorio = userService.generateUserReport();

    // Assert
    expect(relatorio).toContain('Nenhum usuário cadastrado');
  });
});
