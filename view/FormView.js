class FormView {
    static INPUTS_SELECTOR = 'input, textarea';

    constructor(options) {
        this.options = options;
        this.$root = this.initView();
        this.$inputs = this.$root.find(FormView.INPUTS_SELECTOR);
    }

    initView() {
        return $(`
             <form id="todoForm" class="form_addTodo">
                <input id="id" type="hidden"/>
<!--                <label for="addTodo"></label>-->
                <input id="title" type="text" placeholder="Enter todo...">
                <button class="btn submit-btn">
                    Add
                </button>
            </form>
        `)
            .on('submit', this.onFormSubmit.bind(this));
    }

    onFormSubmit(e) {
        e.preventDefault();

        const data = this.getFormData();
        console.log(data);

        // validate
        if (!this.isMessageValid(data)) {
            alert('Поле сообщение не должно быть пустым');
            return;
        }
        this.options.onSubmit(data);
    }

    isMessageValid(todo) {
        return todo.title !== '';
    }

    appendTo($container) {
        $container.append(this.$root);
    }

    getFormData() {
        const contact = {}

        for (const input of this.$inputs) {
            contact[input.id] = input.value;
        }

        return contact;
    }

    setFormData(contact) {
        for (const input of this.$inputs) {
            const inputId = input.id;

            if (inputId in contact) {
                input.value = contact[inputId];
            }
        }
    }
}