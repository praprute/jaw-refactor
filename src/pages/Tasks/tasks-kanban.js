import React, { useEffect } from "react"
import PropTypes from "prop-types"
import MetaTags from 'react-meta-tags';
import { connect } from "react-redux"
import { Container } from "reactstrap"
import { withRouter } from "react-router-dom"
import { isEmpty, map } from "lodash"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Task Cards
import UncontrolledBoard from "./UncontrolledBoard"

import "assets/scss/tasks.scss"
import { getTasks } from "store/tasks/actions"

const TasksKanban = props => {
  const { tasks, onGetTasks } = props

  useEffect(() => {
    onGetTasks()
  }, [onGetTasks])

  const data = map(tasks, task => ({ ...task, cards: task.tasks }))
  data.length = Math.min(data.length, 3)

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Kanban Board | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Tasks" breadcrumbItem="Kanban Board" />
          {!isEmpty(data) && (
            <UncontrolledBoard board={{ columns: data }} content={tasks} />
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

TasksKanban.propTypes = {
  tasks: PropTypes.array,
  onGetTasks: PropTypes.func,
}

const mapStateToProps = ({ tasks }) => ({
  tasks: tasks.tasks,
})

const mapDispatchToProps = dispatch => ({
  onGetTasks: () => dispatch(getTasks()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TasksKanban))
