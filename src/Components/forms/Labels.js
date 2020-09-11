import React, { useEffect, useState } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import ProductService from '../../Services/product.service'
import './Labels.css'

function Labels ({ setFieldValue, productToEdit }) {
  const [tags, setTags] = useState([])
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        let labels = await ProductService.getLabels()
        labels = labels.map(label => {
          return {
            id:   label,
            text: label
          }
        })
        setSuggestions(labels)
      } catch (e) {

      }
    }
    fetchLabels()
  }, [])

  useEffect(() => {
    if (productToEdit) {
      console.log(productToEdit)
      setTags(productToEdit.label.map(label => {
        return {
          id:   label,
          text: label
        }
      }))
    }
  }, [productToEdit])

  const KeyCodes = {
    comma: 188,
    enter: 13,
  }

  const delimiters = [KeyCodes.comma, KeyCodes.enter]

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i))
    setFieldValue('label', tags.filter((tag, index) => index !== i).map(tag => tag.text))
  }

  const handleAddition = (tag) => {
    setTags([...tags, tag])
    setFieldValue('label', [...tags, tag].map(tag => tag.text))
  }

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice()
    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)
    setTags(newTags)
  }

  return (
    <div>
      <ReactTags tags={tags}
                 suggestions={suggestions}
                 handleDelete={handleDelete}
                 handleAddition={handleAddition}
                 handleDrag={handleDrag}
                 delimiters={delimiters}
                 placeholder="Add new label"
                 inline={false}
      />
    </div>
  )
}

export default Labels