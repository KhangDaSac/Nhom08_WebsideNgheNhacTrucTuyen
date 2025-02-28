import { DarkThemeToggle, Avatar, Dropdown, Navbar } from "flowbite-react";
import logo from '../../assets/images/navbar/Logo.svg'

const NavbarComponent = () => {
  const navigations = [
    { id: 1, href: '', content: 'Home' },
    { id: 2, href: '', content: 'Top 100' },
    { id: 3, href: '', content: 'Playlist' },
    { id: 4, href: '', content: 'Artist' }
  ]
  return (
    <Navbar fluid>
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
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded className="mx-2"/>
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@gmail.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <div className="w-100 m-1">
          <form class="mx-auto">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search songs, artists,..." required />
            </div>
          </form>
        </div>
      </Navbar.Collapse>
      <Navbar.Collapse>
        {
          navigations.map((navigation => {
            return <Navbar.Link href={navigation.href} key={navigation.id}>{navigation.content}</Navbar.Link>
          }))
        }
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
