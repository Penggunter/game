Level1={
    preload:function(){
        game.load.image('btnL', 'img/arrowLeft.png');
        game.load.image('btnR', 'img/arrowRight.png');
        game.load.image('btnU', 'img/arrowUp.png');
        game.load.image('btnAttack', 'img/shadedDark36.png');
        game.load.spritesheet('dude', 'img/sprite.png',70,63);
        game.load.image('bg', 'img/bg_space.png');
        game.load.image('BigPlat', 'img/spacePlat.png');
        game.load.image('metalPlat', 'img/metalPlat.png');
        game.load.image('box', 'img/box.png');
        game.load.spritesheet('enemyFly', 'img/enemyFly.png',65,50);
        game.load.image('bullet', 'img/laserPurple.png');
        game.load.image('btnFire', 'img/shadedDark36.png');
        game.load.spritesheet('flagRed', 'img/flag.png',39,137);
    },

    jumpTimer:0,
    
    create:function(){
        game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        
        this.bg = game.add.sprite(0, 0, 'bg');
        this.bg.scale.setTo(2,1.6);
        this.bg = game.add.sprite(800, 0, 'bg');
        this.bg.scale.setTo(2,1.6);
        this.bg = game.add.sprite(1600, 0, 'bg');
        this.bg.scale.setTo(2,1.6);
        this.bg = game.add.sprite(2400, 0, 'bg');
        this.bg.scale.setTo(2,1.6);
        
        game.world.setBounds(0, 0, 4000, 800);
        
        this.flag = game.add.sprite(3248, 550, 'flagRed');
        game.physics.arcade.enable(this.flag);
        this.flag.body.immovable=true
        this.flag.animations.add('flagAnimat', [0,1,2,3], 10, true);
        this.flag.animations.play('flagAnimat');
        
        this.dude = game.add.sprite(200, 300, 'dude');
        game.physics.arcade.enable(this.dude);
        this.dude.body.gravity.y = 300
        this.dude.body.collideWorldBounds = true;
        this.dude.frame=8
        game.camera.follow(this.dude);
        
        this.dude.animations.add('left', [0,1,2,3,4,5,6,7], 10, true);
        this.dude.animations.add('right', [9,10,11,12,13,14,15,18], 10, true);

        
        this.ShroomMasX=[142,475,1087,1712,2060,2430,3130];
        this.ShroomMasY=[game.world.height,game.world.height+200,game.world.height+100,game.world.height+150,game.world.height+50,game.world.height+150,game.world.height+200];
        
        this.plats = game.add.group();
        this.plats.physicsBodyType = Phaser.Physics.ARCADE;
        this.plats.enableBody=true;
        for (var i = 0; i < this.ShroomMasY.length; i++) {
            var a = this.plats.create(this.ShroomMasX[i], this.ShroomMasY[i], 'BigPlat');
            a.anchor.setTo(0,1)
            
        }
        this.plats.setAll('collideWorldBounds',true);
        this.plats.setAll('body.immovable',true);
        
        
        this.metalMasX=[790,1439,2900];
        this.metalMasY=[600,500,730];
        
        this.metalPlat = game.add.group();
        this.metalPlat.physicsBodyType = Phaser.Physics.ARCADE;
        this.metalPlat.enableBody=true;
        for (var i = 0; i < this.metalMasY.length; i++) {
            var b = this.metalPlat.create(this.metalMasX[i], this.metalMasY[i], 'metalPlat'); 
            b.scale.setTo(1,0.5);
        }
        this.metalPlat.setAll('collideWorldBounds',true);
        this.metalPlat.setAll('body.immovable',true);
        
        
        this.box = game.add.group();
        this.box.physicsBodyType = Phaser.Physics.ARCADE;
        this.box.enableBody=true;
        
        this.boxMasX=[2562,2496,2510];
        this.boxMasY=[500,500,400];
        
        for (var i = 0; i < this.boxMasX.length; i++) {
            var d = this.box.create(this.boxMasX[i], this.boxMasY[i], 'box');  
            d.body.gravity.y = 800;
            d.body.velocity.setTo(0);
            //d.body.moves=false;
            d.body.collideWorldBounds=true
        }
        
        
        this.enemyFly = game.add.group();
        this.enemyFly.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemyFly.enableBody=true;
        
        this.enemyFlyX=[854,1546,2510];
        this.enemyFlyY=[430,350,400];
        
        for (var i = 0; i < this.enemyFlyX.length; i++) {
            var f = this.enemyFly.create(this.enemyFlyX[i], this.enemyFlyY[i], 'enemyFly');  
            f.body.gravity.y = 300;
            f.body.collideWorldBounds=true;
            f.body.bounce.setTo(1,1)
            f.scale.setTo(1.5,1.5)
            f.animations.add('enemyAnimat', [0,1,2,3], 10, true);
            f.animations.play('enemyAnimat');
        }
        
        
        this.bullet = game.add.weapon(3, 'bullet');
        this.bullet.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        this.bullet.bulletLifespan = 2000;
        this.bullet.bulletAngleOffset = 180;
        this.bullet.bulletSpeed = 400;
        this.bullet.fireAngle=0;
        this.bullet.trackSprite(this.dude, 14, 0);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        
        
        this.btnLeft = game.add.sprite(30, game.world.height, 'btnL');
        this.btnLeft.anchor.setTo(0,1)

        this.btnLeft.inputEnabled = true;
        this.btnLeft.anchor.setTo(0,1);
        this.btnLeft.events.onInputUp.add(this.stopLeft);
        this.btnLeft.fixedToCamera=true;
        this.btnRight = game.add.sprite(130, game.world.height, 'btnR');
        this.btnRight.anchor.setTo(0,1);
        this.btnRight.inputEnabled = true;
        this.btnRight.events.onInputUp.add(this.stopRight);
        this.btnRight.fixedToCamera=true;
        this.btnUp = game.add.sprite(1100, game.world.height, 'btnU');
        this.btnUp.anchor.setTo(0,1);
        this.btnUp.inputEnabled = true;
        this.btnUp.fixedToCamera=true;
        this.btnFire = game.add.sprite(1000, game.world.height-50, 'btnFire');
        this.btnFire.anchor.setTo(0,1);
        this.btnFire.inputEnabled = true;
        this.btnFire.fixedToCamera=true;
        
        this.btnLeft.events.onInputDown.add(this.goLeft);
        this.btnRight.events.onInputDown.add(this.goRight);
        this.btnUp.events.onInputDown.add(this.goUp);
        this.btnFire.events.onInputDown.add(this.fire);
    },
    
    goLeft:function(){
        Level1.dude.body.velocity.x -= 230;
        Level1.dude.animations.play('left');
    },
    goRight:function(){
        Level1.dude.body.velocity.x += 230;
        Level1.dude.animations.play('right');
    },
    goUp:function(){
        if (Level1.dude.body.onFloor() || Level1.dude.body.touching.down){
            Level1.dude.body.velocity.y = -300;
        }
    },
    fire:function(){
        Level1.bullet.fire();
    },
        
        
    stopLeft:function(){
        Level1.dude.body.velocity.x = 0;
        Level1.dude.animations.stop();
        Level1.dude.frame=8
    },
    stopRight:function(){
        Level1.dude.body.velocity.x = 0;
        Level1.dude.animations.stop();
        Level1.dude.frame=8
    },

        
    update:function(){
        game.physics.arcade.collide(this.dude,this.plats);
        game.physics.arcade.collide(this.dude,this.metalPlat);
        game.physics.arcade.collide(this.dude,this.box,this.stop)
        game.physics.arcade.collide(this.box,this.plats);
        game.physics.arcade.collide(this.box,this.metalPlat);
        game.physics.arcade.collide(this.box,this.box);
        game.physics.arcade.collide(this.enemyFly,this.dude,this.dudeDead);
        game.physics.arcade.collide(this.enemyFly,this.metalPlat);
        game.physics.arcade.collide(this.enemyFly,this.plats);
        game.physics.arcade.collide(this.enemyFly,game.world.height,this.dudeDead);
        game.physics.arcade.overlap(this.bullet.bullets,this.enemyFly,this.enemyFlyDead,null,this);
        game.physics.arcade.overlap(this.dude,this.flag,this.win);
        //console.log(game.input.activePointer.worldX)
        
        if(this.dude.body.onFloor()){
            this.dude.kill();
            this.textWin = game.add.text(580, 400, 'You DEAD!');
            this.textWin.fixedToCamera=true;
        }
    },
    stop:function(a,b){
        b.body.velocity.setTo(0,0);
        b.body.bounce.setTo(0.8)
    },
    dudeDead:function(){
        Level1.dude.kill();
        Level1.textWin = game.add.text(580, 400, 'You DEAD!');
        Level1.textWin.fixedToCamera=true;
    },
    enemyFlyDead:function(bullet, enemyFly){
        console.log(bullet)
        bullet.kill()
        enemyFly.kill()
        console.log("!");
    },
    win:function(){
        Level1.textWin = game.add.text(580, 400, 'You Win!');
        Level1.textWin.fixedToCamera=true;
        
    }
}
