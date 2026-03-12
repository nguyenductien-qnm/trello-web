import { useEffect, useMemo, useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

function WorkspaceSidebarItem({ workspace }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const routes = useMemo(
    () => ({
      boards: `/h/workspaces/${workspace._id}/boards`,
      members: `/h/workspaces/${workspace._id}/members`,
      settings: `/h/workspaces/${workspace._id}/settings`,
      billing: `/h/workspaces/${workspace._id}/billing`
    }),
    [workspace._id]
  )

  const isWorkspaceActive = Object.values(routes).some((path) =>
    location.pathname.startsWith(path)
  )

  const isActive = (path) => location.pathname.startsWith(path)

  useEffect(() => {
    if (isWorkspaceActive) {
      setOpen(true)
    }
  }, [isWorkspaceActive])

  const toggleSection = () => {
    setOpen((prev) => !prev)
  }

  return (
    <>
      <ListItemButton
        onClick={toggleSection}
        sx={{
          borderRadius: 2,
          mb: 0.5,
          bgcolor: isWorkspaceActive ? 'action.selected' : 'transparent',
          '&:hover': {
            bgcolor: isWorkspaceActive ? 'action.selected' : 'action.hover'
          }
        }}
      >
        <ListItemText primary={workspace.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            component={RouterLink}
            to={routes.boards}
            sx={{
              pl: 4,
              borderRadius: 2,
              mx: 1,
              mb: 0.5,
              bgcolor: isActive(routes.boards)
                ? 'rgba(25, 118, 210, 0.08)'
                : 'transparent',
              color: isActive(routes.boards) ? 'primary.main' : 'text.primary',
              '&:hover': {
                bgcolor: isActive(routes.boards)
                  ? 'rgba(25, 118, 210, 0.12)'
                  : 'action.hover'
              }
            }}
          >
            <ListItemText primary="Boards" />
          </ListItemButton>

          <ListItemButton
            component={RouterLink}
            to={routes.members}
            sx={{
              pl: 4,
              borderRadius: 2,
              mx: 1,
              mb: 0.5,
              bgcolor: isActive(routes.members)
                ? 'rgba(25, 118, 210, 0.08)'
                : 'transparent',
              color: isActive(routes.members) ? 'primary.main' : 'text.primary',
              '&:hover': {
                bgcolor: isActive(routes.members)
                  ? 'rgba(25, 118, 210, 0.12)'
                  : 'action.hover'
              }
            }}
          >
            <ListItemText primary="Members" />
          </ListItemButton>

          <ListItemButton
            component={RouterLink}
            to={routes.settings}
            sx={{
              pl: 4,
              borderRadius: 2,
              mx: 1,
              mb: 0.5,
              bgcolor: isActive(routes.settings)
                ? 'rgba(25, 118, 210, 0.08)'
                : 'transparent',
              color: isActive(routes.settings)
                ? 'primary.main'
                : 'text.primary',
              '&:hover': {
                bgcolor: isActive(routes.settings)
                  ? 'rgba(25, 118, 210, 0.12)'
                  : 'action.hover'
              }
            }}
          >
            <ListItemText primary="Setting" />
          </ListItemButton>

          <ListItemButton
            component={RouterLink}
            to={routes.billing}
            sx={{
              pl: 4,
              borderRadius: 2,
              mx: 1,
              mb: 0.5,
              bgcolor: isActive(routes.billing)
                ? 'rgba(25, 118, 210, 0.08)'
                : 'transparent',
              color: isActive(routes.billing) ? 'primary.main' : 'text.primary',
              '&:hover': {
                bgcolor: isActive(routes.billing)
                  ? 'rgba(25, 118, 210, 0.12)'
                  : 'action.hover'
              }
            }}
          >
            <ListItemText primary="Billing" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  )
}

export default WorkspaceSidebarItem
