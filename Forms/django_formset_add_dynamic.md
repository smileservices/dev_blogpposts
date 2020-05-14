# Django Forms - add form dynamically to formset

https://medium.com/@taranjeet/adding-forms-dynamically-to-a-django-formset-375f1090c2b0

https://dev.to/zxenia/django-inline-formsets-with-class-based-views-and-crispy-forms-14o6

use crispy_forms.utils.render_crispy_form


as usual, formsets are abhorently complex and unusable ... need to update/create them separately


## forms.py
class AddressForm(ModelForm):

    def __init__(self, *args, **kwargs):
        super(AddressForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Fieldset(
                'Supplier Address',
                Field('place_id', type='hidden'),
                Field('full_address_array', type='hidden'),
                Field('name'),
                Field('postal_code'),
                Field('country'),
                Field('county'),
                Field('city'),
                Field('neighbourhood'),
                Field('street'),
                Field('street_no'),
                Field('location_x', type='hidden'),
                Field('location_y', type='hidden'),
            )
        )

    class Meta:
        model = Address
        fields = (
            'user', 'name', 'place_id', 'full_address_array', 'postal_code', 'country', 'county', 'city',
            'neighbourhood',
            'street', 'street_no', 'location_x', 'location_y')


AddressFormset = inlineformset_factory(parent_model=Supplier, model=Address, form=AddressForm, extra=3, can_delete=True)


class SupplierForm(UserCreationForm):

    def __init__(self, *args, **kwargs):
        super(SupplierForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Fieldset(
                'New Supplier',
                Field('username'),
                Field('first_name'),
                Field('last_name'),
                Field('password1'),
                Field('password2'),
                Field('name'),
                Field('description'),
                Field('contact'),
                # Fieldset('Add Address', Accordion(
                #     AccordionGroup('h1', HTML('<h1>html1</h1>')),
                #     AccordionGroup('h2', HTML('<h1>html1</h2>')),
                # ))
                Fieldset('Add Address', 
                         Accordion(
                             AccordionFormset('address_formset')
                         )
                     )
            )
        )

    class Meta:
        model = Supplier
        fields = ('username', 'email', 'first_name', 'last_name', 'name', 'description', 'contact

## custom_layout.py


class AccordionFormset(LayoutObject):
    '''
    Groups forms from formset into accordiongroup
    The render method of Accordion layout calls for the render method on its "fields" 
    '''

    def __init__(self, formset_name_in_context, template=None):
        self.formset_name_in_context = formset_name_in_context
        self.fields = []
        if template:
            self.template = template

    def render(self, form, form_style, context, template_pack=TEMPLATE_PACK):
        formset = context[self.formset_name_in_context]
        name_template = 'Address {}'
        rendered = ''
        # cycle through forms in formset
        for idx, address_form in enumerate(formset):
            # create AcordionGroup list with each rendered formset
            acc_obj = AccordionGroup(name_template.format(idx), HTML(render_crispy_form(address_form)))
            acc_obj.data_parent = self.data_parent
            rendered += acc_obj.render(form, form_style, context, template_pack)
        # return rendered
        return rendered

# views.py

class SupplierAdd(StaffRequiredMixin, CreateView):
    model = Supplier
    template_name = 'admin/suppliers/add.html'
    form_class = SupplierForm
    address_formset = AddressFormset

    def post(self, request, *args, **kwargs):
        self.object = None
        form = self.get_form()
        address_form = self.address_formset(request.POST)
        if form.is_valid() and address_form.is_valid():
            address_form.save()
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(SupplierAdd, self).get_context_data(object_list=None, **kwargs)
        context['is_superuser'] = self.request.user.is_superuser
        context['page'] = {
            'google_key': settings.GOOGLE_API_KEY,
        }
        context['address_formset'] = self.address_formset(self.request.POST) if self.request.POST else self.address_formset()
        return context