/**
 * 建造者模式(Builder)：将一个复杂对象的构建层与其表示层相互分离，同样的构建过程可采用不同的表示。
 * 
 * 工厂模式可以创建对象实例或者类簇（抽象工厂），关心的是最终创建哪种类型的类，而不关心创建的过程。
 * 但是在实际情况下，我们可能需要创建一个类，更加关注他的创建过程，
 * 比如创建一个人，我们创建的结果不仅仅是要得到人的实例，还要关注人的性别、爱好、衣着和职位等，换句话说，此时我们更加关注的是创建时类的细节。
 */

// Create a human
const Human = function (params) {
    this.skill = params && params.skill || '保密';
    this.hobby = params && params.hobby || '保密';
}

Human.prototype = {
    getSkll: function () {
        return this.skill;
    },
    getHobby: function () {
        return this.hobby;
    }
}
// 姓名类
const Name = function (name) {
    this.wholeName = name;
    if (name.indexOf(' ') > -1) {
        this.FirstName = name.slice(0, name.indexOf(' '));
        this.SecondName = name.slice(name.indexOf(' '));
    }
}
// 职位类
const Work = function (work) {
    const that = this;
    (function (work, that) {
        switch (work) {
            case 'code':
                that.work = '工程师';
                that.workDescript = '沉迷代码，无法自拔';
                break;
            case 'UI':
                that.work = '设计师';
                that.workDescript = '设计是一门艺术';
                break;
            default:
                that.work = Work;
                that.workDescript = '对不起，暂时无法找到对应的职位信息';
        }
    })(work, that)
}
// 更换职位
Work.prototype.changeWork = function (work) {
    this.work = work;
}
// 添加职位描述
Work.prototype.changeDescript = function (setence) {
    this.workDescript = setence;
}
// 应聘者类，建造者模式
const Person = function (name, work, params) {
    let person = new Human(params);
    person.name = new Name(name);
    person.work = new Work(work);
    return person;
}
// 实例化
const Sheldon = new Person('Sheldon Zhou', 'UI', {
    skill: 'JavaScript、CV、css',
    hobby: '打豆豆'
})
Sheldon.work.changeWork('code');
Sheldon.work.changeDescript('日夜改BUG');
console.log(Sheldon);
/**
 Human {
    skill:"JavaScript、CV、css",
    hobby:"打豆豆",
    name: Name {
        wholeName:"Sheldon Zhou",
        FirstName:"Sheldon",
        SecondName:" Zhou"
    },
    work: Work {
        work:"code",
        workDescript:"日夜改BUG"
    }
 }
 */

/**
 * 建造者模式和工厂模式的区别
 * 
 * 1、工厂模式建造的是一个对象，它追求的是创建的结果（何种类型的类的实例），不关注过程，只关注结果。
 * 2、建造者模式更加关心的是对象创建过程，因此我们通常将创建对象的类模块化，这样使被创建的类的每一个模块都可以得到灵活的引用与高质量的复用，当然我们最终的需求还是创建一个完整的个体，所以在进行拆分创建的整个过程后，我们将得到一个完整的实例。
 * 3、建造者模式虽然可以模块化类，但是这种拆分同时也增加了整体对象类的结构复杂性，如果对象颗粒度很小（属性非常多），或者模块间的复用率很低并且变动不大，我们最好还是创建整体对象，不要使用建造者模式。
 */