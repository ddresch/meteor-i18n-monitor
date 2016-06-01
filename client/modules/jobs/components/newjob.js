import React from 'react';

class NewJob extends React.Component {
  render() {
    const {error} = this.props;
    return (
      <form className="new-post" onSubmit={this.createJob.bind(this)}>
        <h2>Add New Job</h2>
        {error ? <p style={{color: 'red'}}>{error}</p> : null}

        <input ref="titleRef" type="Text" placeholder="Enter your job title." /> <br/>
        <textarea ref="contentRef" placeholder="Enter your job content." /> <br/>
        <button type="submit">Add New</button>
      </form>
    );
  }

  createJob(event) {
    // Becaus the test cannot get event argument
    // so call preventDefault() on undefined cause an error
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    const {create} = this.props;
    const {titleRef, contentRef} = this.refs;

    create(titleRef.value, contentRef.value);
  }
}

export default NewJob;
