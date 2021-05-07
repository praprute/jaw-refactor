import PropTypes from 'prop-types'
import React from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, Badge } from "reactstrap"

//Import Images
import avatar4 from "../../assets/images/users/avatar-4.jpg"
import avatar5 from "../../assets/images/users/avatar-5.jpg"

const CardTaskBox = props => {
  return (
    <React.Fragment>
      <Card className="task-box">
        <CardBody className="borad-width">
          <div className="float-end ms-2">
            <Badge
              color="secondary"
              className="badge-soft-secondary font-size-12"
              pill
            >
              {props.data["status"]}
            </Badge>
          </div>
          <div>
            <h5 className="font-size-15">
              <Link to="#" className="text-dark">
                {props.data["title"]}
              </Link>
            </h5>
            <p className="text-muted mb-4">{props.data["date"]}</p>
          </div>
          <div className="avatar-group float-start">
            <div className="avatar-group-item">
              <Link to="#" className="d-inline-block">
                <img
                  src={avatar4}
                  className="rounded-circle avatar-xs"
                  alt=""
                />
              </Link>
            </div>
            <div className="avatar-group-item">
              <Link to="#" className="d-inline-block">
                <img
                  src={avatar5}
                  className="rounded-circle avatar-xs"
                  alt=""
                />
              </Link>
            </div>

            <div className="avatar-group-item">

              <Link to="#" className="d-inline-block">
                <div className="avatar-xs">
                  <span className="avatar-title rounded-circle bg-info text-white font-size-16">
                    3 +
                </span>
                </div>
              </Link>
            </div>
          </div>

          <div className="text-end">
            <h5 className="font-size-15 mb-1">$ 145</h5>
            <p className="mb-0 text-muted">Budget</p>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

CardTaskBox.propTypes = {
  data: PropTypes.object
}

export default CardTaskBox
