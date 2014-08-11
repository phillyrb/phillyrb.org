require "spec_helper"

describe 'index', type: :feature do
  before do
    visit '/'
  end

  it "displays the correct title header" do
    expect(page).to have_selector('h1.logo a[href="/"]', text: 'Philly.rb')
  end

  it "displays a hero with the correct mission statement" do
    expect(page).to have_selector('h1',
      text: 'Philly.rb is the one and only user group in Philadelphia dedicated to helping Ruby enthusiasts learn, network, and socialize.'
     )
  end

  context 'the "about" sections it displays' do
    context 'the "Network" section' do
      it 'displays the proper heading' do
        expect(page).to have_selector('li.network h1',
          text: 'Network'
        )
      end

      it 'displays the proper description' do
        expect(page).to have_selector('li.network p',
          text: 'Gain access to a growing community of Ruby programmers and enthusiasts.'
        )
      end
    end

    context 'the "Learn" section' do
      it 'displays the proper heading' do
        expect(page).to have_selector('li.learn h1',
          text: 'Learn'
        )
      end

      it 'displays the proper description' do
        expect(page).to have_selector('li.learn p',
          text: 'Our monthly presentations are great for gaining in-depth knowledge on current Ruby and Rails topics.'
        )
      end
    end

    context 'the "Socialize" section' do
      it 'displays the proper heading' do
        expect(page).to have_selector('li.socialize h1',
          text: 'Socialize'
        )
      end

      it 'displays the proper description' do
        expect(page).to have_selector('li.socialize p',
          text: 'Between pub nights and our lunches, we have plenty of chances to get together and shoot the shit.'
        )
      end
    end
  end
end
