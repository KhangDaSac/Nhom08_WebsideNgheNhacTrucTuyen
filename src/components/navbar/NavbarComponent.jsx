import { DarkThemeToggle, Avatar, Dropdown, Navbar } from "flowbite-react";
import logo from '../../assets/images/navbar/Logo.svg'
import user from '../../assets/images/navbar/User.jpg'
import './NavbarComponent.module.scss'

const NavbarComponent = (props) => {
  const navigations = [
    { id: 1, href: '', content: 'Home' },
    { id: 2, href: '', content: 'Top 100' },
    { id: 3, href: '', content: 'Playlist' },
    { id: 4, href: '', content: 'Artist' }
  ]
  const userOptions = [
    { id: 1, href: '', content: 'Account' },
    { id: 2, href: '', content: 'Playlist' },
    { id: 3, href: '', content: 'Log out' }
  ]
  return (
    <Navbar>
      <Navbar.Brand href="">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Music for you</span>
      </Navbar.Brand>

      <div className="flex md:order-2 mx-5">
        <DarkThemeToggle className="mx-2" />
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={user} rounded className="mx-2" />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{props.user.user_name}</span>
            <span className="block truncate text-sm font-medium">{props.user.email}</span>
          </Dropdown.Header>
          {
            userOptions.map((option) => {
              return option.id != 3
                ? <Dropdown.Item key={option.id} href={option.href}>{option.content}</Dropdown.Item>
                : 
                <>
                  <Dropdown.Divider />
                  <Dropdown.Item key={option.id} href={option.href}>{option.content}</Dropdown.Item>
                </>
            })
          }
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <form className="mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" className="lg:min-w-[400px] block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What do you want to play?" required />
          </div>
        </form>
      </Navbar.Collapse>
      <Navbar.Collapse>
        {
          navigations.map((navigation => {
            return <Navbar.Link className="m-4" href={navigation.href} key={navigation.id}>{navigation.content}</Navbar.Link>
          }))
        }
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
