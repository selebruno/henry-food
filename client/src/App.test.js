import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import { RecipeCreate } from './components/RecipeCreate/RecipeCreate';

describe('Try component <RecipeCreate/>', () => {
    let wrapper = shallow(<RecipeCreate />);

    beforeEach(() => {
        wrapper = shallow(<RecipeCreate />);
    });

    it('Renders a <form>', () => {
      expect(wrapper.find('form')).toHaveLength(1)
    })

    it('Renders a label with text equal to "Title"', () => {
      expect(wrapper.find('label').at(0).text()).toEqual('Title:');
    })

    it('Renders an input with property "name" equal to "name"', () => {
      expect(wrapper.find('input[name="name"]')).toHaveLength(1);
    })

    it('Renders a label with text equal to "Summary"', () => {
      expect(wrapper.find('label').at(1).text()).toEqual('Summary:');
    })

    it('Renders a textarea with property "name" equal to "steps"', () => {
      expect(wrapper.find('textarea[name="steps"]')).toHaveLength(1);
    })

    it('Renders a label with text equal to "Score"', () => {
      expect(wrapper.find('label').at(2).text()).toEqual('Score:');
    })

    it('Renders an input with property "name" equal to "score"', () => {
      expect(wrapper.find('input[name="score"]')).toHaveLength(1);
    })

    it('Renders a label with text equal to "Health Score"', () => {
      expect(wrapper.find('label').at(3).text()).toEqual('Health Score:');
    })

    it('Renders an input with propert "name" equal to "healthLevel"', () => {
      expect(wrapper.find('input[name="healthLevel"]')).toHaveLength(1);
    })
    
    it('Renders an input with "type" "submit"', () => {
      expect(wrapper.find('input[type="submit"]')).toHaveLength(1)
    })
  })



