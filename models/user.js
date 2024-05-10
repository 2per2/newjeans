const passportLocalSequelize = require('passport-local-sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.STRING(16),
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
        email: {
                type: Sequelize.STRING(64),
                unique: true,
                allowNull: false
    },
        birthdate: {
                type: Sequelize.DATEONLY,
        }
        }, {
    timestamps: false,
    freezeTableName: true
  });

  // passport-local-sequelize를 사용하여 Passport-local 전략을 추가
  passportLocalSequelize.attachToUser(User, {
    usernameField: 'id', // 사용자 ID를 사용하여 로그인
    hashField: 'password', // 패스워드 해시 저장 필드
    // 추가적인 설정 가능
  });

  // 비밀번호 확인 메서드 추가
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

	// comment 테이블과의 관계 설정
	User.associate = function(models) {
		User.hasMany(models.Comment);
	};

  return User;
}; 
