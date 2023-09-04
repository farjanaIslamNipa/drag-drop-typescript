function autoBind(_: any, _2: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement; 
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor () {
        this.templateElement = <HTMLTemplateElement>document.getElementById("project-input")!
        this.hostElement = <HTMLDivElement>document.getElementById("app")!

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = <HTMLFormElement>importedNode.firstElementChild
        this.element.id = 'user-input'; 

        this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title')
        this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description')
        this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people')

        this.configure();
        this.attach();
    }

    private clear() {
        this.titleInputElement.value = ''
        this.descriptionInputElement.value = ''
        this.peopleInputElement.value = ''
    }

    private gatherUserInput(): [string, string, number] | void {
        const titleInput = this.titleInputElement.value;
        const descriptionInput = this.descriptionInputElement.value;
        const peopleInput = this.peopleInputElement.value;

        if(titleInput.trim().length === 0 || descriptionInput.trim().length === 0 || peopleInput.trim().length === 0){
            alert('Something went wrong');
            return;
        }else {
            return [titleInput, descriptionInput, +peopleInput];
        }
    }

    @autoBind
    private submitHandler(event: Event){
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if(Array.isArray(userInput)){
            const [title, desc, people] = userInput;
            console.log(title, desc, 'ses', people);
            this.clear();
        }
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler)
    } 
    
    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element)
    }
}

const projInput = new ProjectInput()