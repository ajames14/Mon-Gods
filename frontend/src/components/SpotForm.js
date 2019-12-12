import React from 'react'

const SpotForm = ({ form, handleInput, handleSubmit, error }) => (
  <form action='' className='form' onSubmit={e => handleSubmit(e)}>
    <div className="field">
      <label htmlFor="" className="label">
        Name
      </label>
      <div className="control">
        <input
          onChange={e => handleInput(e)}
          type="text"
          name="spotName"
          className="input"
          value={form.spotName}
        />
      </div>
      {error.errors.spotName && !form.spotName && <small className="help is-danger">
        {error.errors.spotName}
      </small>}
    </div>
    <div className="field">
      <label htmlFor="" className="label">
        Latitude (e.g. 18.3359)
      </label>
      <div className="control">
        <input
          onChange={e => handleInput(e)}
          type="text"
          name="lat"
          className="input"
          value={form.lat}
        />
      </div>
      {error.errors.lat && !form.lat && <small className="help is-danger">
        {error.errors.lat}
      </small>}
    </div>
    <div className="field">
      <label htmlFor="" className="label">
        Longitude (e.g. 46.6154)
      </label>
      <div className="control">
        <input
          onChange={e => handleInput(e)}
          type="text"
          name="long"
          className="input"
          value={form.long}
        />
      </div>
      {error.errors.long && !form.long && <small className="help is-danger">
        {error.errors.long}
      </small>}
    </div>
    <div className="field">
      <label htmlFor="" className="label">
        Country
      </label>
      <div className="control">
        <input
          onChange={e => handleInput(e)}
          type="text"
          name="country"
          className="input"
          value={form.country}
        />
      </div>
      {error.errors.country && !form.country && <small className="help is-danger">
        {error.errors.country}
      </small>}
    </div>
    <div className="field">
      <label htmlFor="" className="label">
        Region
      </label>
      <div className="control">
        <input
          onChange={e => handleInput(e)}
          type="text"
          name="region"
          className="input"
          value={form.region}
        />
      </div>
      {error.errors.region && !form.region && <small className="help is-danger">
        {error.errors.region}
      </small>}
    </div>
    <div className="field">
      <label htmlFor="" className="label">
        Image
      </label>
      <div className="control">
        <input
          onChange={e => handleInput(e)}
          type="text"
          name="image"
          className="input"
          value={form.image}
        />
      </div>
      {error.errors.image && !form.image && <small className="help is-danger">
        {error.errors.image}
      </small>}
    </div>
    <div className="field">
      <label htmlFor="" className="label">
        Description
      </label>
      <div className="control">
        <input
          onChange={e => handleInput(e)}
          type="text"
          name="description"
          className="input"
          value={form.description}
        />
      </div>
      {error.errors.description && !form.description && <small className="help is-danger">
        {error.errors.description}
      </small>}
    </div>
    <div className="field">
      <label htmlFor="" className="label">
        Level
      </label>
      <div className="select">
        <select
          onChange={e => handleInput(e)}
          type="text"
          name="level">
          <option value="level"></option>
          <option value="level">Beginner</option>
          <option value="level">Intermediate</option>
          <option value="level">Advanced</option>
        </select>
      </div>
      {error.errors.level && !form.level && <small className="help is-danger">
        {error.errors.level}
      </small>}
    </div>
    <div className="field">
      <label htmlFor="" className="label">
        Type of Wave
      </label>
      <div className="select">
        <select
          onChange={e => handleInput(e)}
          type="text"
          name="typeOfWave">
          <option></option>
          <option value="typeOfWave">Point Break</option>
          <option value="typeOfWave">Beach Break</option>
          <option value="typeOfWave">Reef Break</option>
          <option value="typeOfWave">River Mouth</option>
        </select>
      </div>
      {error.errors.typeOfWave && !form.typeOfWave && <small className="help is-danger">
        {error.errors.typeOfWave}
      </small>}
    </div>
    {error.errors && error.errors.message === 'Unauthorized' && <small className="help is-danger">
      {error.errors.message} - Please log in
    </small>}
    <button className="button is-success">
      Share New Surf Spot
    </button>
  </form>

)

export default SpotForm